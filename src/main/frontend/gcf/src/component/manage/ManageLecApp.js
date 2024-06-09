import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageLecApp.css';
import SideMenu from './ManageSideMenu';
import { paginate, goToFirstPage, goToPrevGroup, goToNextGroup, goToLastPage } from './Pagination';

function lecOnDetailGo() {
    window.location.href = '/manage/lecondetail';
}

function lecOffDetailGo() {
    window.location.href = '/manage/lecoffdetail';
}

function ManageLecApp() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('lecApp_name');
    const [lecInfo, setLecInfo] = useState([]);
    
    useEffect(() => {
        // 온라인 강의 정보 가져오기
        const fetchOnLecInfo = axios.get('/manage/getOnLecInfo');
        // 오프라인 강의 정보 가져오기
        const fetchOffLecInfo = axios.get('/manage/getOffLecInfo');

        Promise.all([fetchOnLecInfo, fetchOffLecInfo])
            .then((responses) => {
                const [onLecResponse, offLecResponse] = responses;
                // 온라인과 오프라인 데이터를 합침
                const combinedLecInfo = [...onLecResponse.data, ...offLecResponse.data];
                setLecInfo(combinedLecInfo);
                console.log(combinedLecInfo);
            })
            .catch(error => {
                console.error('Error fetching lecture information:', error);
            });
    }, []);

    const filteredItems = lecInfo.filter(item => {
        if (searchTerm === '') return true;
        if (searchType === 'lecApp_name') {
            return item.lecApp_name.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (searchType === 'lecApp_lecAppDate') {
            return item.lecApp_lecAppDate.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return false;
    });

    const handleSearchChange = event => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const handleSearchTypeChange = event => {
        setSearchType(event.target.value);
        setCurrentPage(1);
    };

    const handleInfoButtonClick = (type) => {
        if (type === '온라인') {
            lecOnDetailGo();
        } else if (type === '오프라인') {
            lecOffDetailGo();
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredItems.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const isFirstGroup = currentPage <= 5;
    const isLastGroup = currentPage + 4 >= pageNumbers[pageNumbers.length - 1];

    return (
        <div className='lecApp_container'>
            <SideMenu />
            <div className='lecApp'>
                <p>강의 신청 현황</p>
                <div className='lecApp_search'>
                    <select className='lecApp_search_dropdown' onChange={handleSearchTypeChange}>
                        <option value="lecApp_name">이름</option>
                        <option value="lecApp_lecAppDate">강의 신청 날짜</option>
                    </select>
                    <input type="text" placeholder="검색어를 입력하세요" value={searchTerm} onChange={handleSearchChange} />
                    <button className='lecApp_search_button'>검색</button>
                </div>
                <div className='lecApp_area'>
                    <table className='lecApp_table'>
                        <thead>
                            <tr>
                                <th className='lecApp_id'>아이디</th>
                                <th className='lecApp_name'>강사이름</th>
                                <th className='lecApp_title'>제목</th>
                                <th className='lecApp_type'>온/오프라인</th>
                                <th className='lecApp_category'>카테고리</th>
                                <th className='lecApp_lecAppDate'>강의 신청 날짜</th>
                                <th className='lecApp_detail'>정보보기</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.teacherName}</td>
                                    <td>{item.programName}</td>
                                    <td>{item.programType}</td>
                                    <td>{item.category}</td>
                                    <td>{item.operatingStartDay.join('-')}</td>
                                    <td><button onClick={() => handleInfoButtonClick(item.programType)}>정보</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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

export default ManageLecApp;
