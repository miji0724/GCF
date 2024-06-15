import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Offline_Post_List.css';

function OfflinePosterList() {
    const [posters, setPosters] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();
    const [activeStatus, setActiveStatus] = useState('전체');
    const [activeSpace, setActiveSpace] = useState('전체');
    const [activeCategory, setActiveCategory] = useState('전체');
    const [activePage, setActivePage] = useState(1);
    const [selectedDate, setSelectedDate] = useState('');
    const postersPerPage = 4;

    useEffect(() => {
        const fetchPosters = async () => {
            try {
                const response = await axios.get('/api/offProgram/filter', {
                    params: {
                        state: activeStatus === '전체' ? null : activeStatus,
                        placeName: activeSpace === '전체' ? null : activeSpace,
                        category: activeCategory === '전체' ? null : activeCategory,
                        date: selectedDate || null,
                        page: activePage - 1,
                        size: postersPerPage
                    }
                });

                const { content = [], totalPages = 0 } = response.data || {};
                const data = content.map(poster => ({
                    ...poster,
                    applicationStartDate: formatDate(poster.applicationStartDate),
                    applicationEndDate: formatDate(poster.applicationEndDate)
                }));
                setPosters(data);
                setTotalPages(totalPages);
            } catch (error) {
                console.error('정보를 못받음', error);
                setPosters([]);
                setTotalPages(0);
            }
        };

        fetchPosters();
    }, [activePage, activeStatus, activeSpace, activeCategory, selectedDate]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}.${month}.${day}`;
    };

    const gotoOffDetail = (posterId) => {
        navigate(`/OfflineList/details/${posterId}`); // 페이지 이동
    };

    const toggleBookmark = (id, event) => {
        event.stopPropagation();
        const updatedPosters = posters.map(poster =>
            poster.id === id ? { ...poster, isBookmarked: !poster.isBookmarked } : poster
        );
        setPosters(updatedPosters);
    };

    const handleLike = async (posterId, event) => {
        event.stopPropagation();
        try {
            await axios.patch(`/api/offProgram/${posterId}/increment-likes`, null);
            const updatedPosters = posters.map(poster =>
                poster.id === posterId ? { ...poster, likesCount: poster.likesCount + 1 } : poster
            );
            setPosters(updatedPosters);
        } catch (error) {
            console.error('좋아요 업데이트 실패:', error);
        }
    };

    const changePage = (pageNumber) => {
        setActivePage(pageNumber);
    };

    const offlineStatusClass = (posterStatus) => {
        switch (posterStatus) {
            case '접수중':
                return 'PosterStatusReceipt';
            case '접수마감':
                return 'PosterStatusClosed';
            case '준비중':
                return 'PosterStatusPreparing';
            default:
                return '';
        }
    };

    const OfflineCategoryClass = (category) => {
        switch (category) {
            case '교육':
                return 'OfflineCategoryEducation';
            case '체험':
                return 'OfflineCategoryExperience';
            default:
                return '';
        }
    };
    console.log(posters);
    return (
        <div className="OffBodyContainer">
            <div className="FilterBox">
                <div className="FilterSection">
                    <div className="FilterTitle">상태별</div>
                    <div className="FilterOptions">
                        {['전체', '접수중', '접수마감', '준비중'].map((status) => (
                            <button
                                key={status}
                                className={`FilterButton ${activeStatus === status ? 'Active' : ''}`}
                                onClick={() => {
                                    setActiveStatus(status);
                                    setActivePage(1);
                                }}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="FilterSection">
                    <div className="FilterTitle">공간별</div>
                    <div className="FilterOptions">
                        {['전체', '김포아트홀', '김포아트빌리지 한옥마을', '김포아트빌리지', '통진두레문화센터', '김포국제조각공원', '월곶생활문화센터', '김포평화문화관', '작은미술관 보구곶', '애기봉평화생태공원', '기타'].map((space) => (
                            <button
                                key={space}
                                className={`FilterButton ${activeSpace === space ? 'Active' : ''}`}
                                onClick={() => {
                                    setActiveSpace(space);
                                    setActivePage(1);
                                }}
                            >
                                {space}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="FilterSection">
                    <div className="FilterTitle">카테고리별</div>
                    <div className="FilterOptions">
                        {['전체', '교육', '체험'].map((category) => (
                            <button
                                key={category}
                                className={`FilterButton ${activeCategory === category ? 'Active' : ''}`}
                                onClick={() => {
                                    setActiveCategory(category);
                                    setActivePage(1);
                                }}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="FilterSection">
                    <div className="FilterTitle">운영 날짜</div>
                    <input type="date" value={selectedDate} onChange={(e) => {
                        setSelectedDate(e.target.value);
                        setActivePage(1);
                    }} />
                </div>
            </div>

            <div className="OfflinePosterList">
                {posters.length > 0 ? (
                    posters.map(poster => (
                        <div key={poster.id} className="OfflinePosterCard" onClick={() => gotoOffDetail(poster.id)}>
                            <div className="OfflinePosterImageContainer">
                                {poster.poster && poster.poster.file_path ? (
                                    <img src={poster.poster.file_path} alt={poster.programName} className="OfflinePosterImage" />
                                ) : (
                                    <div className="OfflinePosterPlaceholder">포스터 없음</div>
                                )}
                                {poster.applicationState === '접수마감' && (
                                    <div className="OfflineDeadlineImage">
                                        접수마감
                                    </div>
                                )}
                            </div>

                            <div className="OfflinePosterDetails">
                                <div className={`OfflineCategory ${OfflineCategoryClass(poster.category)}`}>
                                    {poster.category}
                                </div>
                                <div className={`OfflinePosterStatus ${offlineStatusClass(poster.applicationState)}`}>
                                    {poster.applicationState}
                                </div>
                                <h3 className="OfflinePosterTitle">{poster.programName}</h3>
                                <p className="OfflinePosterDates">모집 기간: {poster.applicationStartDate} ~ {poster.applicationEndDate}</p>
                                <p className="OfflinePosterLocation">{poster.placeName}</p>
                                <div className="OfflinePosterActions">
                                    <div className="HeartIcon" onClick={(event) => handleLike(poster.id, event)}>♥</div>
                                    <span className="LikeCount">{poster.likesCount}</span>
                                    <span className={`BookmarkIcon ${poster.isBookmarked ? 'Active' : ''}`}
                                        onClick={(event) => toggleBookmark(poster.id, event)}>
                                        {poster.isBookmarked ? '★' : '☆'}
                                    </span>
                                    <span className="OfflineViews">조회수: {poster.views}</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="NoPostersMessage">등록된 포스터가 없습니다.</div>
                )}
            </div>

            <div className="OfflinePagination">
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => changePage(index + 1)}
                        className={activePage === index + 1 ? 'Active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default OfflinePosterList;
