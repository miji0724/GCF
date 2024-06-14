import React, { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Online_detail.css';

function Online_Detail() {
    const [posters, setPosters] = useState([]); // 프로그램 상태 업데이트 
    const navigate = useNavigate();
    const { id } = useParams();
    const [poster, setPoster] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedCommentText, setEditedCommentText] = useState('');
    const [replyVisible, setReplyVisible] = useState({});
    const [replyText, setReplyText] = useState({});
    const Online_list_section_Ref = useRef(null); // 강의 목록
    const Online_pro_info_Ref = useRef(null); // 프로그램 소개 다이렉트
    const Online_teacher_info_Ref = useRef(null); // 강사 소개 다이렉트
    const Comment_list_Ref = useRef(null); // 댓글 리스트


    useEffect(() => {
        const fetchPoster = async () => {
            try {
                const response = await axios.get(`/api/offprogram/${id}`);
                setPoster(response.data);
                await axios.patch(`/api/offprogram/${id}/increment-views`);
            } catch (error) {
                console.error('포스터 정보를 불러오지 못했습니다.', error);
            }
        };
        fetchPoster();

        const fetchComments = async () => {
            try {
                const response = await axios.get(`/api/comments`);
                setComments(response.data);
            } catch (error) {
                console.error('댓글을 불러오지 못했습니다.', error);
            }
        };
        fetchComments();
    }, [id]);

    if (!poster) {
        return <div>포스터 정보를 찾을 수 없습니다.</div>;
    }

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = async () => {
        try {
            const response = await axios.post(`/api/comments`, { postId: id, text: newComment });
            setComments([...comments, response.data]);
            setNewComment('');
        } catch (error) {
            console.error('댓글을 작성하지 못했습니다.', error);
        }
    };

    const handleEditComment = (commentId, text) => {
        setEditingCommentId(commentId);
        setEditedCommentText(text);
    };

    const handleSaveEdit = async (commentId) => {
        try {
            await axios.patch(`/api/comments/${commentId}`, { text: editedCommentText });
            const updatedComments = comments.map(comment =>
                comment.id === commentId ? { ...comment, text: editedCommentText } : comment
            );
            setComments(updatedComments);
            setEditingCommentId(null);
        } catch (error) {
            console.error('댓글을 수정하지 못했습니다.', error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(`/api/comments/${commentId}`);
            setComments(comments.filter(comment => comment.id !== commentId));
        } catch (error) {
            console.error('댓글을 삭제하지 못했습니다.', error);
        }
    };

    const toggleReply = (commentId) => {
        setReplyVisible(prev => ({ ...prev, [commentId]: !prev[commentId] }));
    };

    const handleReplyChange = (e, commentId) => {
        setReplyText({ ...replyText, [commentId]: e.target.value });
    };

    const handleReplySubmit = async (commentId) => {
        try {
            const response = await axios.post(`/api/comments/${commentId}/replies`, { text: replyText[commentId] });
            const updatedComments = comments.map(comment =>
                comment.id === commentId ? { ...comment, replies: [...comment.replies, response.data] } : comment
            );
            setComments(updatedComments);
            setReplyText({ ...replyText, [commentId]: '' });
        } catch (error) {
            console.error('답글을 작성하지 못했습니다.', error);
        }
    };

    const openVideoInNewWindow = (videoId) => {
        window.open(`/video/${videoId}`, '_blank');
    };

    const formatTime = (hours, minutes) => {
        return new Intl.DateTimeFormat('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        }).format(new Date(0, 0, 0, hours, minutes));


    };

    // 강의 목록 섹션으로 스크롤
    const scrollToProList = () => {
        if (Online_list_section_Ref.current) {
            Online_list_section_Ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // 강의소개 섹션으로 스크롤
    const scrollToProgramInfo = () => {
        if (Online_pro_info_Ref.current) {
            Online_pro_info_Ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // 강사소개 섹션으로 스크롤
    const scrollToTeacherInfo = () => {
        if (Online_teacher_info_Ref.current) {
            Online_teacher_info_Ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // 댓글 섹션으로 스크롤
    const scrollToCommentList = () => {
        if (Comment_list_Ref.current) {
            Comment_list_Ref.current.scrollIntoView({ behavior: 'smooth' });
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

    // 북마크 토글 함수
    const toggleBookmark = (id, event) => {
        event.stopPropagation();
        const updatedPosters = posters.map(poster =>
            poster.id === id ? { ...poster, isBookmarked: !poster.isBookmarked } : poster
        );
        setPosters(updatedPosters);
    };

    return (
        <div className='Online_detail_inner'>
            <div className="Online-detail-board_view_head">
                <div className='On_sub_title'><strong> 프로그램 신청 </strong></div>
                <div className={`online-poster-category ${Online_Category_Class(poster.category)}`}>
                    {poster.category}
                </div>

                <h2 className="Online-detail-title">{poster.programName}</h2>

                <div className="Online-details-container">
                    <div className="on_poster_box">
                        <img src={poster.poster.file_path} alt={poster.programName} />
                    </div>

                    <div className="Online-actions-container">
                        <div className="poster-actions">
                            <div className="On_left">
                                <div className="On_heart-icon" onClick={() => handleLike(poster.id)}>♥</div>
                                <span className="On_like-count"> 좋아요: {poster.likesCount}</span>
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
                    <button className='Online_pro_list_Button' onClick={scrollToProList}>교육 목록</button>
                    <button className="Online_pro_info_Button" onClick={scrollToProgramInfo}>교육소개</button>
                    <button className="On_teacher_info_Button" onClick={scrollToTeacherInfo}>강사소개</button>
                    <button className="Online_Comment_Button" onClick={scrollToCommentList}>댓글</button>
                </div>
            </div>

            <div className="Online_Pro_list_Table" ref={Online_list_section_Ref}>
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
                            <th>수강</th>
                        </tr>
                    </thead>
                    <tbody>
                        {poster.videos.map((video, index) => (
                            <tr key={video.id}>
                                <td>{index + 1}</td>
                                <td>{video.videoInfoDetail}</td>
                                <td>{formatTime(video.durationHours, video.durationMinutes)}</td>
                                <td>
                                    <button onClick={() => openVideoInNewWindow(video.id)} className="On_Sign_Button"><span>수강하기</span></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='Online_Pro_Info_Title'>
                <strong>프로그램 소개</strong>
            </div>

            <div className="Online_Pro_Info" ref={Online_pro_info_Ref}>
                <strong><span>[온라인 강의]</span></strong>
                <p>&nbsp;</p>
                <p>
                    <strong>{poster.programName}</strong>
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
                <p>사진</p>
            </div>

            <div className='Online_Teacher_Info_Title'>
                <strong>강사 소개</strong>
            </div>

            <div className='Online_Teacher_Info' ref={Online_teacher_info_Ref}>
                <p>
                    <img src={poster.teacher} className="on_detail_teacher_image" alt="Teacher" />
                </p>

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
            <div className='Online_Comment_Title' ref={Comment_list_Ref}>
                <strong>댓글 게시판</strong>
            </div>
            <div className='Online_Comment_box'>
                <textarea
                    className="Online_input_comment"
                    placeholder="댓글을 작성해주세요. 욕설, 상업적인 내용, 특정인이나 특정사안을 비방하는 내용 등은 예고 없이 삭제될 수 있습니다."
                    value={newComment}
                    onChange={handleCommentChange}
                ></textarea>
                <div className='Write_Online_Comment'>
                    <button className='Write_Online_Comment_Button' onClick={handleCommentSubmit}><span>작성하기</span></button>
                </div>
            </div>
            <div className='Online_Comment_List'>
                {comments.map((comment) => (
                    <div key={comment.id} className="Online_Comment_User_Info">
                        <div className='Online_Comment_User_Name_Date'>
                            <p className='Online_Comment_User_Name'><strong>{comment.author}</strong></p>
                            <p className='Online_Comment_Write_Date'>{comment.date}</p>
                        </div>
                        <div className='Online_Comment_Context'>
                            {editingCommentId === comment.id ? (
                                <textarea
                                    value={editedCommentText}
                                    onChange={(e) => setEditedCommentText(e.target.value)}
                                />
                            ) : (
                                <p>{comment.text}</p>
                            )}
                            {editingCommentId === comment.id ? (
                                <>
                                    <button onClick={() => handleSaveEdit(comment.id)}>저장</button>
                                    <button onClick={() => setEditingCommentId(null)}>취소</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => handleEditComment(comment.id, comment.text)}>수정</button>
                                    <button onClick={() => handleDeleteComment(comment.id)}>삭제</button>
                                </>
                            )}
                            <div className='Reply_area'>
                                <button className='Reply_Write' onClick={() => toggleReply(comment.id)}>
                                    <span>답글</span>
                                </button>
                                {replyVisible[comment.id] && (
                                    <div>
                                        <textarea
                                            value={replyText[comment.id] || ''}
                                            onChange={(e) => handleReplyChange(e, comment.id)}
                                        />
                                        <button onClick={() => handleReplySubmit(comment.id)}>확인</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Online_Detail;
