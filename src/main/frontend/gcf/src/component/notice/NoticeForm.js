import './NoticeForm.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import view from '../../img/view.png';
import calendar from '../../img/calendar.png';
import search from '../../img/search.png';

const NoticeForm = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState('전체검색');
    const [searchTerm, setSearchTerm] = useState('');
    const [notices, setNotices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalNoticeCount, setTotalNoticeCount] = useState(0);
    const itemsPerPage = 8;

    useEffect(() => {
        fetchTotalNoticeCount();
        fetchNotices(currentPage);
    }, [currentPage, selectedItem]);

    const fetchNotices = (page) => {
        const params = {
            page: page - 1,
            size: itemsPerPage,
        };
        if (selectedItem === '제목' && searchTerm) {
            params.title = searchTerm;
        } else if(selectedItem === '내용' && searchTerm) {
            params.content = searchTerm;
        } else if(selectedItem === '전체검색' && searchTerm) {
            params.searchTerm = searchTerm;
        }

        axios.get('/notices', { params })
            .then(response => {
                setNotices(response.data.content);
                setTotalPages(response.data.totalPages);
            })
            .catch(error => {
                console.error('Failed to fetch notices', error);
            });
    };

    const fetchTotalNoticeCount = () => {
        const params = {};
        if (selectedItem === '제목' && searchTerm) {
            params.title = searchTerm;
        } else if(selectedItem === '내용' && searchTerm) {
            params.content = searchTerm;
        } else if(selectedItem === '전체검색' && searchTerm) {
            params.searchTerm = searchTerm;
        }

        axios.get('/notices/count', { params })
            .then(response => {
                setTotalNoticeCount(response.data);
            })
            .catch(error => {
                console.error('Failed to fetch total notice count', error);
            });
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setIsOpen(false);
        setSearchTerm(''); // Reset search term when changing filter
        setCurrentPage(1); // Reset to first page when changing filter
    };

    const handleNoticeClick = (id) => {
        axios.put(`/notices/${id}/views`)
            .then(response => {
                fetchNotices(currentPage);
            })
            .catch(error => {
                console.error('Failed to increase notice views', error);
            });
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        fetchTotalNoticeCount();
        fetchNotices(1);
    };

    return (
        <div className="notice_form">
            <div className="title">공지사항</div>
            <div className="line"></div>
            <div className="count_item">
                총 {totalNoticeCount}건 / {totalPages} 페이지
            </div>
            <div className="grid-container">
                {notices.map((notice, index) => {
                    const date = new Date(notice.createdAt);
                    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
                    
                    return (
                        <Link to={`/notice/${notice.id}`} className="notice-link" onClick={() => handleNoticeClick(notice.id)} key={index}>
                            <div className="grid-item">
                                <p id='noticeTitle'>{notice.title}<br /><br /></p>
                                <div className="dateandview">
                                    <span className="date"><img src={calendar} className="calendarImg" alt="calendar" />{formattedDate}</span>
                                    <span className="views"><img src={view} className="viewImg" alt="view" />{notice.views}</span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
            <div className="notice_search">
                <div className="notice_search_dropdown">
                    <div className="notice_dropdown-toggle" onClick={toggleDropdown}>
                        {selectedItem} {isOpen ? '▴' : '▾'}
                    </div>
                    {isOpen && (
                        <div className="notice_dropdown-content">
                            <p onClick={() => handleItemClick('전체검색')}>전체검색</p>
                            <p onClick={() => handleItemClick('제목')}>제목</p>
                            <p onClick={() => handleItemClick('내용')}>내용</p>
                        </div>
                    )}
                </div>
                {selectedItem === '제목' && (
                    <form className="search_input__notice_form" onSubmit={handleSearchSubmit}>
                        <input className="search_input_notice" type="text" value={searchTerm} onChange={handleSearchChange} placeholder="검색어를 입력하세요" />
                        <button type="submit" className="search_button_notice"><img src={search} alt="Search" /></button>
                    </form>
                )}
                {selectedItem === '내용' && (
                    <form className="search_input__notice_form" onSubmit={handleSearchSubmit}>
                        <input className="search_input_notice" type="text" value={searchTerm} onChange={handleSearchChange} placeholder="검색어를 입력하세요" />
                        <button type="submit" className="search_button_notice"><img src={search} alt="Search" /></button>
                    </form>
                )}
                {selectedItem === '전체검색' && (
                    <form className="search_input__notice_form" onSubmit={handleSearchSubmit}>
                        <input className="search_input_notice" type="text" value={searchTerm} onChange={handleSearchChange} placeholder="검색어를 입력하세요" />
                        <button type="submit" className="search_button_notice"><img src={search} alt="Search" /></button>
                    </form>
                )}
            </div>
            {/* 페이징 */}
            <ul className="pagination">
                <li className="page-item">
                    <button onClick={() => setCurrentPage(1)} className="page-link">
                        {'<<'}
                    </button>
                </li>
                <li className="page-item">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        className="page-link"
                    >
                        {'<'}
                    </button>
                </li>
                {[...Array(totalPages)].map((_, i) => (
                    <li key={i} className="page-item">
                        <button
                            onClick={() => setCurrentPage(i + 1)}
                            className="page-link"
                        >
                            {i + 1}
                        </button>
                    </li>
                ))}
                <li className="page-item">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        className="page-link"
                    >
                        {'>'}
                    </button>
                </li>
                <li className="page-item">
                    <button onClick={() => setCurrentPage(totalPages)} className="page-link">
                        {'>>'}
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default NoticeForm;