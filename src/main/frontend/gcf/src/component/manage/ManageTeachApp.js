import './ManageTeachApp.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideMenu from './ManageSideMenu';
import { paginate, goToFirstPage, goToPrevGroup, goToNextGroup, goToLastPage } from './Pagination';
import { useNavigate } from 'react-router-dom';

function ManageTeachApp() {
    const [currentPage, setCurrentPage] = useState(1); 
    const [itemsPerPage] = useState(15); 
    const [searchTerm, setSearchTerm] = useState(''); 
    const [searchType, setSearchType] = useState('teachApp_name');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const initialTeacherState = {
        affiliatedOrganization: '',
        career: '',
        careerEndYear: '',
        careerStartYear: '',
        id: '',
        licenseName: '',
        member: {
            address: '',
            birth: '',
            createdAt: '',
            detail_address: '',
            email: '',
            email_agreement: '',
            hasChildren: '',
            id: '',
            interests: '',
            mail_agreement: '',
            married: '',
            message_agreement: '',
            name: '',
            offProgramBookMark: [],
            onProgramBookMark: [],
            password: '',
            phone_number: '',
            role: '',
            tel_number: '',
        },
        snsAddress: '',
        teachAbleCategory: '',
        teacherState: '',
        teacher_category: '',
    };
    
    const [teachers, setTeachers] = useState([initialTeacherState]);
    
    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/manage/pendingTeachers');
            setTeachers(response.data);
            console.log(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/manage/searchPendingTeachers', {
                params: {
                    searchType,
                    searchTerm
                }
            });
            setTeachers(response.data);
            setCurrentPage(1);
            console.log(response.data);
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

    const filteredItems = teachers;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = Array.isArray(filteredItems) ? filteredItems.slice(indexOfFirstItem, indexOfLastItem) : [];

   
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredItems.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handleSearchChange = event => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const handleSearchTypeChange = event => {
        setSearchType(event.target.value);
        setCurrentPage(1);
    };

    const handleKeyPress = event => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleTeacherAppDetail = (teacher) => {
        navigate(`/manage/teachappdetail/`, { state: { teacher } });
    };

    const isFirstGroup = currentPage <= 5;
    const isLastGroup = currentPage + 4 >= pageNumbers[pageNumbers.length - 1];

    return (
        <div className='teachApp_container'>
            <SideMenu />
            <div className='teachApp'>
                <p>강사 신청 현황</p>
                <div className='teachApp_search'>
                    <select className='teachApp_search_dropdown' onChange={handleSearchTypeChange}>
                        <option value="teachApp_name">이름</option>
                        <option value="teachApp_id">아이디</option>
                    </select>
                    <input
                        type="text"
                        placeholder="검색어를 입력하세요"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyPress}
                    /><button className='teachApp_search_button'>검색</button>
                </div>
                <div className='teachApp_area'>
                {loading ? (
                        <p>로딩 중...</p>
                    ) : error ? (
                        <p>오류 발생: {error.message}</p>
                    ) : (
                    <table className='teachApp_table'>
                        <thead>
                            <tr>
                                <th className='teachApp_id'>아이디</th>
                                <th className='teachApp_name'>이름</th>
                                <th className='teachApp_phoneNum'>휴대폰 번호</th>
                                <th className='teachApp_certifi'>자격증</th>
                                <th className='teachApp_career'>이력</th>
                                <th className='teachApp_detail'>신청서 보기</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{formatPhoneNumber(item.phone_number)}</td>
                                    <td>{item.licenseName}</td>
                                    <td>{item.career}</td>
                                    <td><button onClick={() => handleTeacherAppDetail(item)}>정보</button></td>
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

export default ManageTeachApp;
