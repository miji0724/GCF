import React, { useState } from 'react';
import SideMenu from './ManageSideMenu';
import './ManageMember.css';
import items from './TestItems/MemberItems';
import { paginate, goToFirstPage, goToPrevGroup, goToNextGroup, goToLastPage } from './Pagination';

function memDetailGo() {
    window.location.href = '/manage/memDetail';
}

function ManageMember() {
    // 게시글과 페이지 관련 상태
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [itemsPerPage] = useState(15); // 페이지 당 게시글 수
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 추가
    const [searchType, setSearchType] = useState('member_name'); // 검색 기준 상태 추가

    // 검색 필터링
    const filteredItems = items.filter(item => {
        // 검색어가 비어있으면 모든 아이템을 보여줌
        if (searchTerm === '') return true;
        // 선택한 검색 기준에 따라 검색 수행
        if (searchType === 'member_name') {
            return item.member_name.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (searchType === 'member_joinDate') {
            return item.member_joinDate.toLowerCase().includes(searchTerm.toLowerCase());
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
        <div className='member_container'>
            <SideMenu />
            <div className='member'>
                <p>일반회원 관리</p>
                <div className='member_search'>
                    <select className='member_search_dropdown' onChange={handleSearchTypeChange}>
                        <option value="member_name">이름</option>
                        <option value="member_joinDate">회원가입 날짜</option>
                    </select>
                    <input type="text" placeholder="검색어를 입력하세요" value={searchTerm} onChange={handleSearchChange} />
                </div>
                <div className='member_area'>
                    <table className='member_table'>
                        <thead>
                            <tr>
                                <th className='member_id'>번호</th>
                                <th className='member_name'>이름</th>
                                <th className='member_phoneNum'>휴대폰 번호</th>
                                <th className='member_addr'>주소</th>
                                <th className='member_joinDate'>회원가입 날짜</th>
                                <th className='member_teachWhe'>강사</th>
                                <th className='member_detail'>정보보기</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.member_id}</td>
                                    <td>{item.member_name}</td>
                                    <td>{item.member_phoneNum}</td>
                                    <td>{item.member_addr}</td>
                                    <td>{item.member_joinDate}</td>
                                    <td>{item.member_teachWhe ? 'O' : 'X'}</td>
                                    <td><button onClick={memDetailGo}>정보</button></td>
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

export default ManageMember;
