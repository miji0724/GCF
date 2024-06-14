import React, { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Offline_detail.css';

function SelectDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [poster, setPoster] = useState(null);
    const Off_pro_info_Ref = useRef(null);
    const Off_teacher_info_ref = useRef(null);

    useEffect(() => {
        const fetchPoster = async () => {
            try {
                const response = await axios.get(`/api/offProgram/${id}`); 
                setPoster(response.data);
                await axios.patch(`/api/offProgram/${id}/increment-views`); // 조회수 갱신
            } catch (error) {
                console.error('포스터 정보를 불러오지 못했습니다.', error);
            }
        };
        fetchPoster();
    }, [id]);

    if (!poster) {
        return <div>포스터 정보를 찾을 수 없습니다.</div>;
    }

    // 날짜 타입 
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    };

    // 시간 타입
    const formatTime = (time) => {
        if (typeof time === 'string') return time; // 이미 문자열인 경우
        const [hours, minutes] = time; // time 객체에서 시간을 추출
        return new Intl.DateTimeFormat('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        }).format(new Date(0, 0, 0, hours, minutes));
    };

    // 강의 상태 구분
    function getStatusClass(posterStatus) {
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
    }

    // 좋아요 수를 증가시키는 함수
    const handleLike = async (posterId) => {
        try {
            await axios.patch(`/api/offProgram/${posterId}/increment-likes`);
            setPoster({ ...poster, likesCount: poster.likesCount + 1 });
        } catch (error) {
            console.error('좋아요를 증가시키지 못했습니다.', error);
        }
    };

    // 북마크 토글 함수
    const toggleBookmark = async (id) => {
        try {
            // 북마크 상태를 변경하는 API 추가 예정
            setPoster({ ...poster, isBookmarked: !poster.isBookmarked });
        } catch (error) {
            console.error('북마크 상태를 변경하지 못했습니다.', error);
        }
    };

    // 수강하기 클릭시 수강신청 페이지 이동
    const handleSignUpClick = () => {
        if (poster.currentParticipants < poster.maxParticipants) {
            navigate(`/OfflineList/details/${id}/signup`); // 프로그램 신청 경로
        }
    };

    // 교육소개 섹션으로 스크롤
    const scrollToProInfo = () => {
        if (Off_pro_info_Ref.current) {
            Off_pro_info_Ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // 강사소개 섹션으로 스크롤
    const scrollToTeacherInfo = () => {
        if (Off_teacher_info_ref.current) {
            Off_teacher_info_ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className='inner'>
            <div className="poster-detail-board_view_head">
                <div className='Off_sub_title'><strong> 프로그램 신청 </strong></div>
                <div className={`poster-status ${getStatusClass(poster.applicationState)}`}>
                    {poster.applicationState}
                </div>
                <h2 className="poster-detail-title">{poster.programName}</h2>
                <div className="poster-detail-container">
                    <div className="poster_box">
                        <img src={poster.poster.file_path} alt={poster.programName} className="poster-image" />
                    </div>
                    <div className="poster-info-area">
                        <p><strong>운영기간:</strong> {formatDate(poster.operatingStartDay)} ~ {formatDate(poster.operatingEndDay)}</p>
                        <p><strong>운영장소:</strong> {poster.placeName}</p>
                        <p><strong>운영요일:</strong> {poster.dayOfWeek}</p>
                        <p><strong>운영시간:</strong> {formatTime(poster.startTime)} ~ {formatTime(poster.endTime)}</p>
                        <p><strong>모집기간:</strong> {formatDate(poster.applicationStartDate)} ~ {formatDate(poster.applicationEndDate)}</p>
                        <p><strong>모집인원:</strong> {poster.maxParticipants}</p>
                        <p><strong>참가료:</strong> {poster.participationFee}</p>
                        <p><strong>카테고리:</strong> {poster.category}</p>
                        <p><strong>신청현황:</strong> {poster.currentParticipants} / {poster.maxParticipants}</p>

                        <div className="actions-container">
                            <div className="poster-actions">
                                <div className="Off_left">
                                    <div className="Off_heart-icon" onClick={() => handleLike(poster.id)}>♥</div>
                                    <span className="Off_like-count"> 좋아요: {poster.likesCount}</span>
                                </div>
                                <div className="Off_center">
                                    <span className={`Off_bookmark-icon ${poster.isBookmarked ? 'active' : ''}`} onClick={() => toggleBookmark(poster.id)}>
                                        {poster.isBookmarked ? '★' : '☆'}
                                    </span>
                                </div>
                                <div className="Off_right">
                                    <span className="Off_Detail_Views"><strong>조회수: {poster.views}</strong></span>
                                </div>
                            </div>
                        </div>
                        <div className='offline_info_buttons'>
                            <button className="off_info_Button" onClick={scrollToProInfo}>교육소개</button>
                            <button className="off_teacher_info_Button" onClick={scrollToTeacherInfo}>강사소개</button>
                            <button className="SignButton" onClick={handleSignUpClick} disabled={poster.currentParticipants >= poster.maxParticipants}>
                                신청하기
                            </button>
                        </div>
                    </div>
                </div>
                <div className='board_view_cont'>
                    <div id="off_pro_info_board" ref={Off_pro_info_Ref} className="off_pro_info_board">
                        <p>프로그램 소개</p>
                        {poster.programInfos.map(info => (
                            <div key={info.id}>
                                <p>{info.description}</p>
                                {info.attachment && (
                                    <p>
                                        <img src={info.attachment.file_path} alt="Program Attachment" className="off_detail_poster_image" />
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>

                    <div id="off_tea_info_board" ref={Off_teacher_info_ref} className='off_tea_info_board'>
                        <p>강사 소개</p>
                        {poster.teacherInfos.map(info => (
                            <div key={info.id}>
                                <p>{info.description}</p>
                                {info.attachment && (
                                    <p>
                                        <img src={info.attachment.file_path} alt="Teacher Attachment" className="off_detail_poster_image" />
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SelectDetails;
