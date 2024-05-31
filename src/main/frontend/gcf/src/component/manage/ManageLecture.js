import './ManageLecture.css';
import React, { useState, useEffect } from 'react';
import SideMenu from './ManageSideMenu';
import items from './TestItems/LectureItems';
import { paginate, goToFirstPage, goToPrevGroup, goToNextGroup, goToLastPage } from './Pagination';

function lecOnDetailGo() {
    window.location.href = '/manage/lecondetail';
}

function lecOffDetailGo() {
    window.location.href = '/manage/lecoffdetail';
}

function ManageLecture() {
    // 게시글과 페이지 관련 상태
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [itemsPerPage] = useState(15); // 페이지 당 게시글 수
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 추가
    const [searchType, setSearchType] = useState('lecture_name'); // 검색 기준 상태 추가

    // URL 매개변수에서 teacherName 추출하여 검색어로 사용
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const teacherName = urlParams.get('teacherName');
        if (teacherName) {
            setSearchTerm(teacherName);
        }
    }, []);

    // 검색 필터링
    const filteredItems = items.filter(item => {
        // 검색어가 비어있으면 모든 아이템을 보여줌
        if (searchTerm === '') return true;
        // 선택한 검색 기준에 따라 검색 수행
        if (searchType === 'lecture_name') {
            return item.lecture_name.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (searchType === 'lecture_lecRegistDate') {
            return item.lecture_lecRegistDate.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return false;
    });

    // 현재 페이지의 게시글 범위 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    // 페이지 번호 계산
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredItems.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    // 검색어 업데이트 함수
    const handleSearchChange = event => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // 검색어가 변경될 때 첫 페이지로 이동
    };

    // 검색 기준 업데이트 함수
    const handleSearchTypeChange = event => {
        setSearchType(event.target.value);
        setCurrentPage(1); // 검색 기준이 변경될 때 첫 페이지로 이동
    };

    // 함수 선택
    const handleInfoButtonClick = (lecture_type) => {
        if (lecture_type === '온라인') {
            lecOnDetailGo();
        } else if (lecture_type === '오프라인') {
            lecOffDetailGo();
        }
    };

    // 현재 페이지 그룹이 첫 페이지 그룹인지 확인
    const isFirstGroup = currentPage <= 5;

    // 현재 페이지 그룹이 마지막 페이지 그룹인지 확인
    const isLastGroup = currentPage + 4 >= pageNumbers[pageNumbers.length - 1];

    return (
        <div className='lecture_container'>
            <SideMenu />
            <div className='lecture'>
                <p>강의 관리</p>
                <div className='lecture_search'>
                    <select className='lecture_search_dropdown' onChange={handleSearchTypeChange}>
                        <option value="lecture_name">이름</option>
                        <option value="lecture_lecRegistDate">강의 등록 날짜</option>
                    </select>
                    <input type="text" placeholder="검색어를 입력하세요" value={searchTerm} onChange={handleSearchChange} />
                    <button className='lecture_search_button'>검색</button>
                </div>
                <div className='lecture_area'>
                    <table className='lecture_table'>
                        <thead>
                            <tr>
                                <th className='lecture_id'>번호</th>
                                <th className='lecture_name'>강사</th>
                                <th className='lecture_title'>제목</th>
                                <th className='lecture_type'>온/오프라인</th>
                                <th className='lecture_category'>카테고리</th>
                                <th className='lecture_lecRegistDate'>강의 등록 날짜</th>
                                <th className='lecture_detail'>정보보기</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.lecture_id}</td>
                                    <td>{item.lecture_name}</td>
                                    <td>{item.lecture_title}</td>
                                    <td>{item.lecture_type}</td>
                                    <td>{item.lecture_category}</td>
                                    <td>{item.lecture_lecRegistDate}</td>
                                    <td><button onClick={() => handleInfoButtonClick(item.lecture_type)}>정보</button></td>
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
                                <button onClick={() => goToLastPage(filteredItems, itemsPerPage, setCurrentPage)} className='page-link'>
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

export default ManageLecture;
