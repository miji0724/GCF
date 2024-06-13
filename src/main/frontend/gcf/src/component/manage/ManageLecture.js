import './ManageLecture.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideMenu from './ManageSideMenu';
import { paginate, goToFirstPage, goToPrevGroup, goToNextGroup, goToLastPage } from './Pagination';
import { useNavigate } from 'react-router-dom';

function ManageLecture() {
    // 게시글과 페이지 관련 상태
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [itemsPerPage] = useState(15); // 페이지 당 게시글 수
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 추가
    const [searchType, setSearchType] = useState('lecture_name'); // 검색 기준 상태 추가
    const [lecInfo, setLecInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchLectures();
    }, []);

    const fetchLectures = async () => {
        setLoading(true);
        const fetchOnLecInfo = axios.get('/manage/getOnPrograms');
        const fetchOffLecInfo = axios.get('/manage/getOffPrograms');

        Promise.all([fetchOnLecInfo, fetchOffLecInfo])
            .then((responses) => {
                const [onLecResponse, offLecResponse] = responses;
                const combinedLecInfo = [...onLecResponse.data, ...offLecResponse.data];

                combinedLecInfo.sort((a, b) => new Date(a.operatingStartDay) - new Date(b.operatingStartDay));

                setLecInfo(combinedLecInfo);
                console.log(combinedLecInfo);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching lecture information:', error);
                console.log(fetchOnLecInfo);
                setLoading(false);
            });
    };

    const handleSearch = async () => {
        setLoading(true);
        try {
            const fetchOnLecInfo = axios.get('/manage/getSearchOnPrograms', {
                params: {
                    searchType,
                    searchTerm
                }
            });

            const fetchOffLecInfo = axios.get('/manage/getSearchOffPrograms',{
                params: {
                    searchType,
                    searchTerm
                }
            });

            Promise.all([fetchOnLecInfo, fetchOffLecInfo])
            .then((responses) => {
                const [onLecResponse, offLecResponse] = responses;
                const combinedLecInfo = [...onLecResponse.data, ...offLecResponse.data];

                combinedLecInfo.sort((a, b) => new Date(a.operatingStartDay) - new Date(b.operatingStartDay));

                setLecInfo(combinedLecInfo);
                console.log(combinedLecInfo);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching lecture information:', error);
                console.log(fetchOnLecInfo);
                setLoading(false);
            });
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    const filteredItems = lecInfo;

    const lecOnDetailGo = (item) => {
        // 선택한 항목의 데이터를 URL 쿼리 매개변수로 전달하여 상세 페이지로 이동
        navigate('/manage/lecondetail', { state: {item}  }); // 선택한 항목의 데이터를 함께 전달
    };

    const lecOffDetailGo = (item) => {
        // 선택한 항목의 데이터를 URL 쿼리 매개변수로 전달하여 상세 페이지로 이동
        navigate('/manage/lecoffdetail', { state: {item}  }); // 선택한 항목의 데이터를 함께 전달
    };

    // 검색어 업데이트 함수
    const handleSearchChange = event => {
        setSearchTerm('');
        setSearchTerm(event.target.value);
        setCurrentPage(1); // 검색어가 변경될 때 첫 페이지로 이동
        
    };

    // 검색 기준 업데이트 함수
    const handleSearchTypeChange = event => {
        setSearchType('');
        setSearchType(event.target.value);
        setCurrentPage(1); // 검색 기준이 변경될 때 첫 페이지로 이동
    };

    // 함수 선택
    const handleInfoButtonClick = (item) => {
        if (item.programType === '온라인') {
            lecOnDetailGo(item);
        } else if (item.programType === '오프라인') {
            lecOffDetailGo(item);
        }
    };

    const handleKeyPress = event => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };


    // 현재 페이지의 게시글 범위 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = Array.isArray(filteredItems) ? filteredItems.slice(indexOfFirstItem, indexOfLastItem) : [];

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredItems.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const isFirstGroup = currentPage <= 5;
    const isLastGroup = currentPage + 4 >= pageNumbers[pageNumbers.length - 1];

    return (
        <div className='lecture_container'>
            <SideMenu />
            <div className='lecture'>
                <p>강의 관리</p>
                <div className='lecture_search'>
                    <select className='lecture_search_dropdown' onChange={handleSearchTypeChange}>
                        <option value="lecture_name">이름</option>
                        <option value="lecture_id">아이디</option>
                    </select>
                    <input
                        type="text"
                        placeholder="검색어를 입력하세요"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyPress}
                    /><button className='lecture_search_button'>검색</button>
                </div>
                <div className='lecture_area'>
                {loading ? (
                        <p>로딩 중...</p>
                    ) : error ? (
                        <p>오류 발생: {error.message}</p>
                    ) : (
                    <table className='lecture_table'>
                        <thead>
                            <tr>
                                <th className='lecture_id'>아이디</th>
                                <th className='lecture_name'>강사이름</th>
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
                                    <td>{item.teacher.id}</td>
                                    <td>{item.teacher.member.name}</td>
                                    <td>{item.programName}</td>
                                    <td>{item.programType}</td>
                                    <td>{item.category}</td>
                                    <td>{item.operatingStartDay.join('-')}</td>
                                    <td><button onClick={() => handleInfoButtonClick(item)}>정보</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    )}
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
