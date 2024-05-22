import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePosters } from '../Posters/Online_posters'; // Context API를 사용하여 posters 데이터를 가져옴
import './Online_Post_List.css';

function Online_Post_List() {
    const { On_posters, setPosters } = usePosters();
    const { category } = useParams(); // URL에서 카테고리 파라미터를 가져옴
    const postersPerPage = 4; // 한 페이지당 포스터 수
    const [activePage, setActivePage] = useState(1); // 현재 페이지 번호
    const navigate = useNavigate();

    // 선택된 카테고리로 포스터 필터링
    const filteredPosters = category ? On_posters.filter(poster => poster.category === category) : On_posters;

    // 총 페이지 수 계산
    const totalPages = Math.ceil(filteredPosters.length / postersPerPage);

    // 포스터 클릭시 상세 페이지 이동
    const goToDetails = (id) => {
        navigate(`/OnlineList/details/${id}`);
    };

    // 북마크 토글 함수
    const toggleBookmark = (id, event) => {
        event.stopPropagation();
        const updatedPosters = On_posters.map(poster =>
            poster.id === id ? { ...poster, isBookmarked: !poster.isBookmarked } : poster
        );
        setPosters(updatedPosters);
    };

    // 현재 페이지에 따라 포스터 데이터를 슬라이싱
    const currentPosters = filteredPosters.slice(
        (activePage - 1) * postersPerPage,
        activePage * postersPerPage
    );

    const changePage = (pageNumber) => {
        setActivePage(pageNumber);
    };

    // 포스터 ID를 받아 좋아요 수를 증가시키는 함수
    const handleLike = (posterId, event) => {
        event.stopPropagation();
        const updatedPosters = On_posters.map(poster =>
            poster.id === posterId ? { ...poster, likes: poster.likes + 1 } : poster
        );
        setPosters(updatedPosters);
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

    useEffect(() => {
        setActivePage(1); // 카테고리가 변경될 때 페이지를 첫 페이지로 설정
        console.log('Selected category:', category);
        console.log('Filtered posters:', filteredPosters);
        console.log('URL Params category:', category);
    }, [category]);

    return (
        <div className="online-body-container">
            <div className="online-poster-list">
                {currentPosters.map(poster => (
                    <div key={poster.id} className="online-poster-card" onClick={() => goToDetails(poster.id)}>
                        <div className="online-poster-image-container">
                            <img src={poster.imageUrl} alt={poster.title} className="online-poster-image" />
                        </div>
                        <div className="online-poster-details">
                            <div className={`online-poster-category ${Online_Category_Class(poster.category)}`}>
                                {poster.category}
                            </div>
                            <h3 className="online-poster-title">{poster.title}</h3>
                            <p className="online-poster-dates">{poster.dates}</p>
                            <div className="online-poster-actions">
                                <div className="online-heart-icon" onClick={(event) => handleLike(poster.id, event)}>♥</div>
                                <span className="online-like-count">{poster.likes}</span>
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
