import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './Online_Post_List.css';

function Online_Post_List() {
    const [posters, setPosters] = useState([]); // 프로그램 상태 업데이트 
    const [totalPages, setTotalPages] = useState(0); // 총 페이지 수 상태 추가

    const { category } = useParams(); // 카테고리 값 가져옴 online/{category}

    const postersPerPage = 4; // 페이지 당 포스터 수 
    const [activePage, setActivePage] = useState(1);
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchPosters = async () => {
            try {
                const response = await axios.get(`/api/onProgram/filter`, {
                    params: {
                        category: category,
                        page: activePage - 1,
                        size: postersPerPage
                    }
                });
                setPosters(response.data.content);
                setTotalPages(response.data.totalPages); // 총 페이지 수 설정
            } catch (error) {
                console.error('포스터 데이터를 가져오는데 실패했습니다:', error);
            }
        };

        fetchPosters();
    }, [category, activePage]);

    // 포스터 클릭시 상세 페이지 이동
    const goToDetails = (id) => {
        navigate(`/OnlineList/details/${id}`);
    };

    // 북마크 토글 함수
    const toggleBookmark = (id, event) => {
        event.stopPropagation();
        const updatedPosters = posters.map(poster =>
            poster.id === id ? { ...poster, isBookmarked: !poster.isBookmarked } : poster
        );
        setPosters(updatedPosters);
    };

    // YYYY.MM.DD 프로그램 업로드 날짜
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}.${month}.${day}`;
    };

    const changePage = (pageNumber) => {
        setActivePage(pageNumber);
    };

    // 포스터 ID를 받아 좋아요 수를 증가시키는 함수
    const handleLike = async (posterId, event) => {
        event.stopPropagation();
        try {
            await axios.patch(`/api/onProgram/${posterId}/increment-likes`);
            const updatedPosters = posters.map(poster =>
                poster.id === posterId ? { ...poster, likesCount: poster.likesCount + 1 } : poster
            );
            setPosters(updatedPosters);
        } catch (error) {
            console.error('좋아요 업데이트 실패:', error);
        }
    };

    // 카테고리별 색상 구분 함수
    function Online_Category_Class(category) {
        switch (category) {
            case '음악':
                return 'online-category-Music';
            case '미술':
                return 'online-category-Art';
            case '과학':
                return 'online-category-Science';
            case '디자인':
                return 'online-category-Design';
            case '교육':
                return 'online-category-Education';
            case '기타':
                return 'online-category-Others';
            default:
                return 'online-category-Undefined';
        }
    }

    return (
        <div className="online-body-container">
            <div className="online-poster-list">
                {posters.map(poster => (
                    <div key={poster.id} className="online-poster-card" onClick={() => goToDetails(poster.id)}>
                        <div className="online-poster-image-container">
                            <img src={poster.poster.file_path} alt={poster.programName} className="online-poster-image" />
                        </div>
                        <div className="online-poster-details">
                            <div className={`online-poster-category ${Online_Category_Class(poster.category)}`}>
                                {poster.category}
                            </div>
                            <h3 className="online-poster-title">{poster.programName}</h3>
                            <p className="online-poster-dates">{formatDate(poster.operatingStartDay)}</p>
                            <div className="online-poster-actions">
                                <div className="online-heart-icon" onClick={(event) => handleLike(poster.id, event)}>♥</div>
                                <span className="online-like-count">{poster.likesCount}</span>
                                <span className={`online-bookmark-icon ${poster.isBookmarked ? 'active' : ''}`}
                                    onClick={(event) => toggleBookmark(poster.id, event)}>
                                    {poster.isBookmarked ? '★' : '☆'}
                                </span>
                                <span className="online-views">조회수: {poster.views}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="online-pagination">
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

export default Online_Post_List;
