import React, { useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePosters } from '../Posters/Online_posters'; // Context API를 사용하여 posters 데이터를 가져옴
import userProfile from '../../img/user_noimg_profile.jpg';
import './Online_detail.css';


function Online_Deatil() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { On_posters, setPosters } = usePosters();
    const poster = On_posters.find(p => p.id === parseInt(id));
    const Online_list_section = useRef(null);
    const Online_info_Ref = useRef(null);
    const Online_teacher_info_Ref = useRef(null);
    const Online_comment_Ref = useRef(null);

    const [currentLesson, setCurrentLesson] = useState(null);
    const [comments, setComments] = useState([]); // 댓글 목록 관리
    const [newComment, setNewComment] = useState(''); // 새로운 댓글 내용
    const [replyVisible, setReplyVisible] = useState({}); // 답글 입력창 가시성 관리
    const [replyText, setReplyText] = useState({}); // 각 댓글의 답글 내용

    if (!poster) {
        return <div>포스터 정보를 찾을 수 없습니다.</div>;
    }

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

    // 포스터 ID를 받아 좋아요 수를 증가시키는 함수
    const handleLike = (posterId) => {
        const updatedPosters = On_posters.map(poster =>
            poster.id === posterId ? { ...poster, likes: poster.likes + 1 } : poster
        );
        setPosters(updatedPosters);
    };

    // 북마크 토글 함수
    const toggleBookmark = (id) => {
        const updatedPosters = On_posters.map(poster =>
            poster.id === id ? { ...poster, isBookmarked: !poster.isBookmarked } : poster
        );
        setPosters(updatedPosters);
    };

    // 교육목록 섹션으로 스크롤
    const SCROLL_TO_ONLINE_LIST = () => {
        if (Online_list_section) {
            Online_list_section.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // 교육소개 섹션으로 스크롤
    const SCROLL_TO_ONLINE_Info = () => {
        if (Online_info_Ref.current) {
            Online_info_Ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // 강사소개 섹션으로 스크롤
    const SCROLL_TO_TEACHER_INFO = () => {
        if (Online_teacher_info_Ref.current) {
            Online_teacher_info_Ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // 댓글 섹션으로 스크롤
    const SCROLL_TO_COMMENT = () => {
        if (Online_comment_Ref.current) {
            Online_comment_Ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleProgressUpdate = (lessonId, currentTime, duration) => {
        const progress = (currentTime / duration) * 100;
        const updatedPoster = { ...poster, [lessonId]: progress };
        const updatedPosters = On_posters.map(p =>
            p.id === poster.id ? updatedPoster : p
        );
        setPosters(updatedPosters);
    };

    const openVideoInNewWindow = (lessonId) => {
        const videoWindow = window.open('', '_blank', 'width=800,height=600');
        videoWindow.document.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>동영상 재생</title>
            </head>
            <body>
                <video id="lessonVideo" controls width="100%">
                    <source src="${poster.moviesrc}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <script>
                    const video = document.getElementById('lessonVideo');
                    video.currentTime = 0;
                    video.play();
                    video.ontimeupdate = function() {
                        window.opener.postMessage({ lessonId: '${lessonId}', currentTime: video.currentTime, duration: video.duration }, '*');
                    };
                </script>
            </body>
            </html>
        `);
        videoWindow.document.close();
    };
    // 수강 신청 시 동영상창 열리게 

    window.addEventListener('message', (event) => {
        if (event.origin === window.location.origin) {
            const { lessonId, currentTime, duration } = event.data;
            handleProgressUpdate(lessonId, currentTime, duration);
        }
    }); // 송수신처리 

    // 댓글 작성 로직
    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleCommentSubmit = () => {
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}.${month}.${day}`;
        };

        const newCommentObj = {
            id: comments.length + 1,
            text: newComment,
            author: '닉네임', // 백엔드 시 구현
            date: formatDate(new Date()),
            replies: []
        };
        setComments([...comments, newCommentObj]);
        setNewComment('');
    };

    // 답글 입력창 토글
    const toggleReply = (commentId) => {
        setReplyVisible((prev) => ({
            ...prev,
            [commentId]: !prev[commentId]
        }));
    };

    // 답글 내용 변경
    const handleReplyChange = (event, commentId) => {
        setReplyText({
            ...replyText,
            [commentId]: event.target.value
        });
    };

    // 답글 작성
    const handleReplySubmit = (commentId) => {
        const reply = {
            id: comments.find(comment => comment.id === commentId).replies.length + 1,
            text: replyText[commentId] || '',
            author: '닉네임', // 백엔드 시 구현
            date: new Date().toLocaleDateString()
        };

        setComments(comments.map(comment => {
            if (comment.id === commentId) {
                return {
                    ...comment,
                    replies: [...comment.replies, reply]
                };
            }
            return comment;
        }));

        setReplyText({
            ...replyText,
            [commentId]: ''
        });

        setReplyVisible({
            ...replyVisible,
            [commentId]: false
        });
    };

    return (
        <div className='Online_detail_inner'>
            <div className="Online-detail-board_view_head">
                <div className='On_sub_title'><strong> 프로그램 신청 </strong></div>
                <div className={`online-poster-category ${Online_Category_Class(poster.category)}`}>
                    {poster.category}
                </div>

                <h2 className="Online-detail-title">{poster.title}</h2>

                <div className="Online-details-container">
                    <div className="on_poster_box">
                        <img src={poster.imageUrl} alt={poster.title} />
                    </div>

                    <div className="Online-actions-container">
                        <div className="poster-actions">
                            <div className="On_left">
                                <div className="On_heart-icon" onClick={() => handleLike(poster.id)}>♥</div>
                                <span className="On_like-count"> 좋아요: {poster.likes}</span>
                            </div>
                            <div className="On_center">
                                <span className={`On_bookmark-icon ${poster.isBookmarked ? 'active' : ''}`} onClick={() => toggleBookmark(poster.id)}>
                                    {poster.isBookmarked ? '★' : '☆'}
                                </span>
                            </div>
                            <div className="On_right">
                                <span className="On_Detail_Views"><strong>조회수: {poster.views}</strong></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='Online_info_buttons'>
                    <button className='Online_pro_list_Button' onClick={SCROLL_TO_ONLINE_LIST}>교육 목록</button>
                    <button className="Online_pro_info_Button" onClick={SCROLL_TO_ONLINE_Info}>교육소개</button>
                    <button className="On_teacher_info_Button" onClick={SCROLL_TO_TEACHER_INFO}>강사소개</button>
                    <button className="Online_Comment_Button" onClick={SCROLL_TO_COMMENT}>댓글</button>
                </div>
            </div>

            <div className="Online_Pro_list_Table" ref={Online_list_section}>
                <div className='Online_list_Title'>
                    <strong>프로그램 목록</strong>
                </div>
                <table className='Online_program_list'>
                    <colgroup>
                        <col style={{ width: '90px' }} />
                        <col />
                        <col style={{ width: '130px' }} />
                        <col style={{ width: '130px' }} />
                        <col style={{ width: '170px' }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>회차</th>
                            <th>과정명</th>
                            <th>시간</th>
                            <th>진도</th>
                            <th>수강</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="Lesson_1">1강</td>
                            <td colSpan="4" className="Lesson_1_title">파워포인트 설정 방법</td>
                        </tr>
                        <tr>
                            <td>1-1</td>
                            <td className="Lesson_sub_title">콘텐츠 제작을 위한 파워포인트 설정</td>
                            <td>00:21:08</td>
                            <td>{(poster['1-1'] || 0).toFixed(2)}%</td>
                            <td>
                                <button onClick={() => openVideoInNewWindow('1-1')} className="On_Sign_Button"><span>수강하기</span></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className='Online_Pro_Info_Title'>
                <strong>프로그램 소개</strong>
            </div>

            <div className="Online_Pro_Info" ref={Online_info_Ref}>
                <strong><span>[온라인 강의]</span></strong>
                <p>&nbsp;</p>
                <p>
                    <strong>[온라인 강의 이름]</strong>
                </p>
                <p>&nbsp;</p>
                <p>
                    <strong>&lt;수험생&gt; 상시 모집중!</strong>
                </p>
                <p>&nbsp;</p>
                <p>
                    <em><strong>모자람없이 온전한, 월곶만의 문화예술프로그램을 만나보세요!</strong></em>
                </p>
                <p>(전체 프로그램 내용 확인은 마지막 이미지 참고)</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>- &lt;반려동물 소품 만들기&gt; : 김포국제조각공원 내 '김포평화문화관'에서 진행예정입니다.</p>
                <p>- &lt;원데이클래스: 컬러비즈 냉장고 자석 만들기&gt; : 통진두레단오제 참여 시민 누구나 무료로 참여가능합니다.</p>

                <p>&nbsp;</p>
                <p>
                    <img src={poster.etc} alt={poster.title} className="on_detail_poster_image" />
                </p>
            </div>

            <div className='Online_Teacher_Info_Title'>
                <strong>강사 소개</strong>
            </div>

            <div className='Online_Teacher_Info' ref={Online_teacher_info_Ref}>
                <p>
                    <img src={poster.teacher} className="on_detail_teacher_image" />
                </p>

                <p>&nbsp;</p>
                <strong>강사명:</strong>
                <br></br>
                오승근
                <p>&nbsp;</p>
                <strong>강의분야: </strong>
                <br></br>
                영상
                <p>&nbsp;</p>
                <strong>주요이력</strong>
                <br></br>
                ◆ 2023 ~ 현재  수원여대 방송콘텐츠과 겸임교수
                <br></br>
                ◆ 2003 ~ 2012  OZ film s.r.o. (체코 프라하)
                <br></br>
                ◆ 2012 ~ 현재  오즈필름
                <p>&nbsp;</p>
                <strong>강의가능분야: </strong>
                영상촬영
                조명
                <p>&nbsp;</p>
                <strong>SNS 주소: </strong>
                http://www.oz-film.com
            </div>

            <div className='Online_Comment' ref={Online_comment_Ref}>
                <div className='Online_Comment_Title'>
                    <strong>댓글 게시판</strong>
                </div>
                <div className='Online_Comment_box'>
                    <textarea className="Online_input_comment" placeholder="댓글을 작성해주세요. 욕설, 상업적인 내용, 특정인이나 특정사안을 비방하는 내용 등은 예고 없이 삭제될 수 있습니다." value={newComment}
                        onChange={handleCommentChange}></textarea>

                    <div className='Write_Online_Comment'>
                        <button className='Write_Online_Comment_Button' onClick={handleCommentSubmit}><span>작성하기</span></button>
                    </div>
                </div>

                <div className='Online_Comment_List'>
                    {comments.map((comment) => (
                        <div key={comment.id} className="Online_Comment_User_Info">

                            <div className="Online_Comment_User_Profile">
                                <img src={userProfile} alt="UserProfile" />

                            </div>
                            <div className='Online_Comment_User_Name_Date'>
                                <p className='Online_Comment_User_Name'><strong>{comment.author}</strong></p>
                                <p className='Online_Comment_Write_Date'>{comment.date}</p>

                            </div>

                            <div className='Online_Comment_Context'>
                                <p>{comment.text}</p>
                            </div>

                            <div className='Reply_area'>
                                <button className='Reply_Write' onClick={() => toggleReply(comment.id)}>
                                    <span>답글</span>
                                </button>
                            </div>


                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
}

export default Online_Deatil;