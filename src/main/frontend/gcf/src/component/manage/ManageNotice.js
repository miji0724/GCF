import './ManageNotice.css';
import SideMenu from './ManageSideMenu';
import React, { useState } from 'react';
import items from './TestItems/NoticeItems'; // items import

import { paginate, goToFirstPage, goToPrevGroup, goToNextGroup, goToLastPage } from './Pagination';

function noticeWrite() {
    window.location.href = '/manage/noticewrite';
}

function ManageNotice() {
    // 게시글과 페이지 관련 상태
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [itemsPerPage] = useState(15); // 페이지 당 게시글 수

    // 현재 페이지의 게시글 범위 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // 페이지 번호 계산
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    // 현재 페이지 그룹이 첫 페이지 그룹인지 확인
    const isFirstGroup = currentPage <= 5;

    // 현재 페이지 그룹이 마지막 페이지 그룹인지 확인
    const isLastGroup = currentPage + 4 >= pageNumbers[pageNumbers.length - 1];

    return (
        <body>
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
                                {items.slice(indexOfFirstItem, indexOfLastItem).map((item, index) => ( // items를 map으로 순회하여 각 항목을 JSX로 변환
                                    <tr key={index}>
                                        <td>{item.manageNotice_id}</td>
                                        <td>{item.manageNotice_title}</td>
                                        <td>{item.manageNotice_writer}</td>
                                        <td>{item.manageNotice_date}</td>
                                        <td>{item.manageNotice_views}</td>
                                        <td><button onClick={noticeWrite} className='modify_button'>수정</button></td>
                                        <td><button className='delete_button'>삭제</button></td>
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
                                    <button onClick={() => goToLastPage(items, itemsPerPage, setCurrentPage)} className='page-link'>
                                        {'>>'}
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </body>
    );
}

export default ManageNotice;
