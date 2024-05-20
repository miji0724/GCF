import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageNotice.css';
import SideMenu from './ManageSideMenu';

function noticeWrite() {
    window.location.href = '/manage/noticewrite';
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('ko-KR', options);
}

function ManageNotice() {
    const [notices, setNotices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15);

    useEffect(() => {
        axios.get('http://localhost:5000/api/notices')
            .then(response => {
                setNotices(response.data);
            })
            .catch(error => {
                console.error('Error fetching notices:', error);
            });
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = notices.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(notices.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const isFirstGroup = currentPage <= 5;
    const isLastGroup = currentPage + 4 >= pageNumbers[pageNumbers.length - 1];

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
                                    <td>{item.title}</td>
                                    <td>{item.author}</td>
                                    <td>{formatDate(item.created_at)}</td>
                                    <td>{item.views}</td>
                                    <td><button onClick={noticeWrite} className='modify_button'>수정</button></td>
                                    <td><button className='delete_button'>삭제</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <ul className='pagination'>
                        {!isFirstGroup && (
                            <>
                                <li className='page-item'>
                                    <button onClick={() => setCurrentPage(1)} className='page-link'>
                                        {'<<'}
                                    </button>
                                </li>
                                <li className='page-item'>
                                    <button onClick={() => setCurrentPage(currentPage - 5)} className='page-link'>
                                        {'<'}
                                    </button>
                                </li>
                            </>
                        )}
                        {pageNumbers.filter(number => Math.ceil(number / 5) === Math.ceil(currentPage / 5)).map(number => (
                            <li key={number} className='page-item'>
                                <button onClick={() => setCurrentPage(number)} className='page-link'>
                                    {number}
                                </button>
                            </li>
                        ))}
                        {!isLastGroup && (
                            <>
                                <li className='page-item'>
                                    <button onClick={() => setCurrentPage(currentPage + 5)} className='page-link'>
                                        {'>'}
                                    </button>
                                </li>
                                <li className='page-item'>
                                    <button onClick={() => setCurrentPage(pageNumbers[pageNumbers.length - 1])} className='page-link'>
                                        {'>>'}
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ManageNotice;
