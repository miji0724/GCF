import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import SideMenu from './ManageSideMenu';
import './ManageMember.css';
import { paginate, goToFirstPage, goToPrevGroup, goToNextGroup, goToLastPage } from './Pagination';

function ManageMember() {
    const [members, setMembers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('member_name');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/manage/getAllMembers');
            setMembers(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/manage/searchMembers', {
                params: {
                    searchType,
                    searchTerm
                }
            });
            setMembers(response.data);
            setCurrentPage(1);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    const formatPhoneNumber = (phoneNumber) => {
        const cleaned = ('' + phoneNumber).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
        if (match) {
            return `${match[1]}-${match[2]}-${match[3]}`;
        }
        return phoneNumber;
    };
    const filteredItems = members;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = Array.isArray(filteredItems) ? filteredItems.slice(indexOfFirstItem, indexOfLastItem) : [];

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredItems.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handleSearchChange = event => {
        setSearchTerm(event.target.value);
    };

    const handleSearchTypeChange = event => {
        setSearchType(event.target.value);
    };

    const handleKeyPress = event => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleMemberDetail = (member) => {
        navigate('/manage/memDetail', { state: { member } });
    };
    
    const isFirstGroup = currentPage <= 5;
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
                    <input 
                        type="text" 
                        placeholder="검색어를 입력하세요" 
                        value={searchTerm} 
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyPress} 
                    />
                    <button className='member_search_button' onClick={handleSearch}>검색</button>
                </div>
                <div className='member_area'>
                    {loading ? (
                        <p>로딩 중...</p>
                    ) : error ? (
                        <p>오류 발생: {error.message}</p>
                    ) : (
                        <table className='member_table'>
                            <thead>
                                <tr>
                                    <th className='member_id'>아이디</th>
                                    <th className='member_name'>이름</th>
                                    <th className='member_phoneNum'>휴대폰 번호</th>
                                    <th className='member_addr'>주소</th>
                                    <th className='member_joinDate'>회원가입 날짜</th>
                                    <th className='member_detail'>정보보기</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{formatPhoneNumber(item.phone_number)}</td>
                                        <td>{item.address}</td>
                                        <td>{item.createdAt}</td>
                                        <td><button onClick={() => handleMemberDetail(item)}>정보</button></td>
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

export default ManageMember;