import './ManageTeacher.css';
import React, { useState } from 'react';
import SideMenu from './ManageSideMenu';
import items from './TestItems/TeachItems';
import { paginate, goToFirstPage, goToPrevGroup, goToNextGroup, goToLastPage } from './Pagination';

function teachLecGo(teacherName) {
    // teacherName 값을 가지고 '/manage/lecture'로 이동
    window.location.href = '/manage/lecture?teacherName=' + encodeURIComponent(teacherName);
}
function teachDetailGo() {
    window.location.href = '/manage/teachdetail';
}

function ManageTeacher() {
    // 게시글과 페이지 관련 상태
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [itemsPerPage] = useState(15); // 페이지 당 게시글 수
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 추가
    const [searchType, setSearchType] = useState('teacher_name'); // 검색 기준 상태 추가

    // 검색 필터링
    const filteredItems = items.filter(item => {
        // 검색어가 비어있으면 모든 아이템을 보여줌
        if (searchTerm === '') return true;
        // 선택한 검색 기준에 따라 검색 수행
        if (searchType === 'teacher_name') {
            return item.teacher_name.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (searchType === 'teacher_teachRegistDate') {
            return item.teacher_teachRegistDate.toLowerCase().includes(searchTerm.toLowerCase());
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

    // 현재 페이지 그룹이 첫 페이지 그룹인지 확인
    const isFirstGroup = currentPage <= 5;

    // 현재 페이지 그룹이 마지막 페이지 그룹인지 확인
    const isLastGroup = currentPage + 4 >= pageNumbers[pageNumbers.length - 1];

    return (
        <div className='teacher_container'>
            <SideMenu />
            <div className='teacher'>
                <p>강사회원 관리</p>
                <div className='teacher_search'>
                    <select className='teacher_search_dropdown' onChange={handleSearchTypeChange}>
                        <option value="teacher_name">이름</option>
                        <option value="teacher_teachRegistDate">강사 등록 날짜</option>
                    </select>
                    <input type="text" placeholder="검색어를 입력하세요" value={searchTerm} onChange={handleSearchChange} />
                    <button className='teacher_search_button'>검색</button>
                </div>
                <div className='teacher_area'>
                    <table className='teacher_table'>
                        <thead>
                            <tr>
                                <th className='teacher_id'>번호</th>
                                <th className='teacher_name'>이름</th>
                                <th className='teacher_phoneNum'>휴대폰 번호</th>
                                <th className='teacher_certifi'>자격증</th>
                                <th className='teacher_career'>이력</th>
                                <th className='teacher_teachRegistDate'>강사 등록 날짜</th>
                                <th className='teacher_teachLec'>강의</th>
                                <th className='teacher_detail'>정보보기</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.teacher_id}</td>
                                    <td>{item.teacher_name}</td>
                                    <td>{item.teacher_phoneNum}</td>
                                    <td>{item.teacher_certifi}</td>
                                    <td>{item.teacher_career}</td>
                                    <td>{item.teacher_teachRegistDate}</td>
                                    <td><button onClick={() => teachLecGo(item.teacher_name)}>강의</button></td>
                                    <td><button onClick={teachDetailGo}>정보</button></td>
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

export default ManageTeacher;
