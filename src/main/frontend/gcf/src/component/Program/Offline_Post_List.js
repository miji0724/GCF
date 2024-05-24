import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Offline_Post_List.css';

function Offline_poster_list() {
    const [posters, setPosters] = useState([]);
    const navigate = useNavigate();
    const [activeStatus, setActiveStatus] = useState('전체');
    const [activeSpace, setActiveSpace] = useState('전체');
    const [activeCategory, setActiveCategory] = useState('전체');
    const [activePage, setActivePage] = useState(1);
    const [selectedDate, setSelectedDate] = useState('');
    const postersPerPage = 4;
    const totalPages = Math.ceil(posters.length / postersPerPage);

    useEffect(() => {
        fetchPosters();
    }, []);

    const fetchPosters = async () => {
        try {
            const response = await axios.get('/api/off_programs'); // 백엔드 API 경로
            setPosters(response.data);
        } catch (error) {
            console.error("There was an error fetching the posters!", error);
        }
    };

    const filteredPosters = posters.filter(poster =>
        (activeStatus === '전체' || poster.posterStatus === activeStatus) &&
        (activeSpace === '전체' || poster.location === activeSpace) &&
        (activeCategory === '전체' || poster.category === activeCategory) &&
        (selectedDate === '' || new Date(poster.dates.split(' ~ ')[0]) >= new Date(selectedDate))
    );

    const goToDetails = (id) => {
        navigate(`/OfflineList/details/${id}`);
    };

    const toggleBookmark = (id, event) => {
        event.stopPropagation();
        const updatedPosters = posters.map(poster =>
            poster.id === id ? { ...poster, isBookmarked: !poster.isBookmarked } : poster
        );
        setPosters(updatedPosters);
    };

    const handleLike = (posterId, event) => {
        event.stopPropagation();
        const updatedPosters = posters.map(poster =>
            poster.id === posterId ? { ...poster, likes: poster.likes + 1 } : poster
        );
        setPosters(updatedPosters);
    };

    const currentPosters = filteredPosters.slice(
        (activePage - 1) * postersPerPage,
        activePage * postersPerPage
    );

    const changePage = (pageNumber) => {
        setActivePage(pageNumber);
    };

    const Offline_StatusClass = (posterStatus) => {
        switch (posterStatus) {
            case '접수중':
                return 'poster-status-receipt';
            case '접수마감':
                return 'poster-status-closed';
            case '준비중':
                return 'poster-status-preparing';
            default:
                return '';
        }
    };

    const Offline_categoryClass = (category) => {
        switch (category) {
            case '교육':
                return 'Offline_poster-category-Education';
            case '체험':
                return 'Offline_poster-category-Experience';
            default:
                return '';
        }
    };

    return (
        <div className="Off-body-container">
            <div className="filterBox">
                <div className="filterSection">
                    <div className="filterTitle">상태별</div>
                    <div className="filterOptions">
                        {['전체', '접수중', '접수마감', '준비중'].map((status) => (
                            <button
                                key={status}
                                className={`filterButton ${activeStatus === status ? 'active' : ''}`}
                                onClick={() => setActiveStatus(status)}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="filterSection">
                    <div className="filterTitle">공간별</div>
                    <div className="filterOptions">
                        {['전체', '김포아트홀', '김포아트빌리지 한옥마을', '김포아트빌리지', '통진두레문화센터', '김포국제조각공원', '월곶생활문화센터', '김포평화문화관', '작은미술관 보구곶', '애기봉평화생태공원', '기타'].map((space) => (
                            <button
                                key={space}
                                className={`filterButton ${activeSpace === space ? 'active' : ''}`}
                                onClick={() => setActiveSpace(space)}
                            >
                                {space}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="filterSection">
                    <div className="filterTitle">카테고리별</div>
                    <div className="filterOptions">
                        {['전체', '교육', '체험'].map((category) => (
                            <button
                                key={category}
                                className={`filterButton ${activeCategory === category ? 'active' : ''}`}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="filterSection">
                    <div className="filterTitle">날짜별</div>
                    <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
                </div>
            </div>

            <div className="Offline_poster-list">
                {currentPosters.map(poster => (
                    <div key={poster.id} className="Offline_poster-card" onClick={() => goToDetails(poster.id)}>
                        <div className="Offline_poster-image-container">
                            <img src={poster.imageUrl} alt={poster.title} className="Offline_poster-image" />
                            {poster.posterStatus === '접수마감' && (
                                <div className="Offline_DEADLINE_IMAGE">
                                    접수마감
                                </div>
                            )}
                        </div>
                        <div className="Offline_poster-details">
                            <div className={`Offline_poster-category ${Offline_categoryClass(poster.category)}`}>
                                {poster.category}
                            </div>
                            <div className={`Offline_poster-status ${Offline_StatusClass(poster.posterStatus)}`}>
                                {poster.posterStatus}
                            </div>
                            <h3 className="Offline_poster-title">{poster.title}</h3>
                            <p className="Offline_poster-dates">{poster.dates}</p>
                            <p className="Offline_poster-location">{poster.location}</p>
                            <div className="Offline_poster-actions">
                                <div className="heart-icon" onClick={(event) => handleLike(poster.id, event)}>♥</div>
                                <span className="like-count">{poster.likes}</span>
                                <span className={`bookmark-icon ${poster.isBookmarked ? 'active' : ''}`}
                                    onClick={(event) => toggleBookmark(poster.id, event)}>
                                    {poster.isBookmarked ? '★' : '☆'}
                                </span>
                                <span className="Offline_views">조회수: {poster.views}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="Offline-pagination">
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => changePage(index + 1)}
                        className={activePage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Offline_poster_list;