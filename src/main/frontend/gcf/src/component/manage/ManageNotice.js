import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ManageNotice.css';
import SideMenu from './ManageSideMenu';
import { paginate, goToFirstPage, goToPrevGroup, goToNextGroup, goToLastPage } from './Pagination';

function noticeWrite() {
    window.location.href = '/manage/noticewrite';
}

function ManageNotice() {
    const [notices, setNotices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15);
    const navigate = useNavigate();

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = notices.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(notices.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const isFirstGroup = currentPage <= 5;
    const isLastGroup = currentPage + 4 >= pageNumbers[pageNumbers.length - 1];

    useEffect(() => {
        axios.get('http://localhost:8090/manage/notices')
            .then(response => {
                const sortedNotices = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setNotices(sortedNotices);
            })
            .catch(error => {
                console.error('Error fetching notices:', error);
            });
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            axios.delete(`http://localhost:8090/manage/notices/${id}`)
                .then(response => {
                    const updatedNotices = notices.filter(item => item.id !== id);
                    setNotices(updatedNotices);
                })
                .catch(error => {
                    console.error('Error deleting notice:', error);
                });
        }
    };

    // 기존 코드에 parseAttachmentsData 함수 추가
    const handleEdit = (id) => {
        axios.get(`http://localhost:8090/manage/notices/${id}`)
            .then(response => {
                const getNotice = JSON.parse(response.data); // 받아온 데이터를 파싱하여 객체로 변환
                console.log("getNotice:", getNotice); // 디버깅 용
                navigate(`/manage/noticewrite/${id}`, { state: { getNotice } });
            })
            .catch(error => {
                console.error('Error fetching notice detail:', error);
                // 공지사항 정보를 가져오는데 실패한 경우에 대한 처리
            });
    };

    return (
        <div className='manageNotice_container'>
            <SideMenu />
            <div className='manageNotice'>
                <p>공지사항 관리</p>
                <button className='manageNotice_button' onClick={noticeWrite}>글쓰기</button>
                <div className='manageNotice_area'>
                    <table className='manageNotice_table'>
                        <thead>
                            <tr>
                                <th className='manageNotice_id'>번호</th>
                                <th className='manageNotice_title'>제목</th>
                                <th className='manageNotice_writer'>작성자</th>
                                <th className='manageNotice_date'>날짜</th>
                                <th className='manageNotice_views'>조회수</th>
                                <th className='manageNotice_modify'>수정</th>
                                <th className='manageNotice_delete'>삭제</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.title.length > 20 ? `${item.title.slice(0, 80)}...` : item.title}</td>
                                    <td>{item.author}</td>
                                    <td>{item.createdAt}</td>
                                    <td>{item.views}</td>
                                    <td><button onClick={() => handleEdit(item.id)} className='modify_button'>수정</button></td>
                                    <td><button onClick={() => handleDelete(item.id)} className='delete_button'>삭제</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* 페이징 */}
                    <ul className='pagination'>
                        {!isFirstGroup && (
                            <li className='page-item'>
                                <button onClick={() => goToFirstPage(setCurrentPage)} className='page-link'>
                                    {'<<'}
                                </button>
                            </li>
                        )}
                        {!isFirstGroup && (
                            <li className='page-item'>
                                <button onClick={() => goToPrevGroup(currentPage, setCurrentPage)} className='page-link'>
                                    {'<'}
                                </button>
                            </li>
                        )}
                        {pageNumbers.filter(number => Math.ceil(number / 5) === Math.ceil(currentPage / 5)).map(number => (
                            <li key={number} className='page-item'>
                                <button onClick={() => paginate(number, setCurrentPage)} className='page-link'>
                                    {number}
                                </button>
                            </li>
                        ))}
                        {!isLastGroup && (
                            <li className='page-item'>
                                <button onClick={() => goToNextGroup(currentPage, pageNumbers, setCurrentPage)} className='page-link'>
                                    {'>'}
                                </button>
                            </li>
                        )}
                        {!isLastGroup && (
                            <li className='page-item'>
                                <button onClick={() => goToLastPage(notices, itemsPerPage, setCurrentPage)} className='page-link'>
                                    {'>>'}
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ManageNotice;
