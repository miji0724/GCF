import React,{useRef} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePosters } from '../Posters/Offline_posters'; // Context API를 사용하여 posters 데이터를 가져옴

import './Offline_detail.css';


function SelectDetails() {

    const navigate = useNavigate();
    const { id } = useParams();
    const { posters, setPosters } = usePosters();
    const poster = posters.find(p => p.id === parseInt(id));
    const Off_pro_info_Ref = useRef(null);
    const Off_teacher_info_ref = useRef(null);

    if (!poster) {
        return <div>포스터 정보를 찾을 수 없습니다.</div>;
    }

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

    // 포스터 ID를 받아 좋아요 수를 증가시키는 함수
    const handleLike = (posterId) => {
        const updatedPosters = posters.map(poster =>
            poster.id === posterId ? { ...poster, likes: poster.likes + 1 } : poster //삼항 연산식 아이디가 같으면 
        );
        setPosters(updatedPosters);
    };

    // 북마크 토글 함수
    const toggleBookmark = (id) => {
        const updatedPosters = posters.map(poster =>
            poster.id === id ? { ...poster, isBookmarked: !poster.isBookmarked } : poster
        );
        setPosters(updatedPosters);
    };

    // 수강하기 클릭시 수강신청 페이지 이동

    const handleSignUpClick = () => {
        navigate(`/OfflineList/details/${id}/signup`); // 프로그램 신청 경로
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
                <div className='Off_sub_title'> <strong> 프로그램 신청 </strong> </div>
                <div className={`poster-status ${getStatusClass(poster.posterStatus)}`}>
                    {poster.posterStatus}
                </div>
                <h2 className="poster-detail-title">{poster.title}</h2>
                <div className="poster-detail-container">

                    <div class="poster_box">
                        <img src={poster.imageUrl} alt={poster.title} className="poster-image" />
                    </div>
                    <div class="poster-info-area">
                        <p><strong>운영기간:</strong> {poster.dates}</p>
                        <p><strong>운영장소:</strong> {poster.location}</p>
                        <p><strong>운영요일:</strong> {poster.day_of_week}</p>
                        <p><strong>운영시간:</strong> {poster.time}</p>
                        <p><strong>모집시간:</strong> {poster.recruitment}</p>
                        <p><strong>모집대상:</strong> {poster.target}</p>
                        <p><strong>모집인원:</strong> {poster.participants}</p>
                        <p><strong>참가료:</strong> {poster.money}</p>
                        <p><strong>카테고리:</strong> {poster.posterStatus}</p>
                        <p><strong>비고:  </strong> 재료비/2만5천원 </p>
                        <p><strong>신청현황 : </strong> 0 / {poster.participants} </p>

                        <div class="actions-container">
                        <div className="poster-actions">
                            <div className="Off_left">
                                <div className="Off_heart-icon" onClick={() => handleLike(poster.id)}>♥</div>
                                <span className="Off_like-count"> 좋아요: {poster.likes}</span>
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

                        <div class='offline_info_buttons'>

                                <button class="off_info_Button" onClick={scrollToProInfo}>교육소개</button>

                                <button className="off_teacher_info_Button" onClick={scrollToTeacherInfo}>강사소개</button>

                                <button className="SignButton" onClick={handleSignUpClick}>신청하기</button>

                        </div>


                    </div>



                </div>

                <div className='board_view_cont'>

                    <div id="off_pro_info_board" ref={Off_pro_info_Ref} className="off_pro_info_board">
                        <p>프로그램 소개</p>
                        <strong><span>[2024 김포문화재단 월곶생활문화센터 문화예술프로그램]</span></strong>
                        <p>&nbsp;</p>
                        <p>
                            <strong>[2024 김포문화재단 월곶생활문화센터 문화예술프로그램]</strong>
                        </p>
                        <p>&nbsp;</p>
                        <p>
                            <strong>&lt;오롯이, 월곶&gt; 5~8월 수강생 모집!</strong>
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
                        <p>◆ <strong>모집기간</strong> : 2024. 4. 15.(월) 14시~마감 시까지</p>
                        <p>◆ <strong>모집대상</strong> : 김포시민(초등~시니어)</p>
                        <p>◆ <strong>우대사항</strong> : 월곶면 주민 방문 접수(전화접수 안됨) (4월 30일까지)</p>
                        <p>※프로그램별 15% 내외, 현주소 기재된 등본 확인</p>
                        <p>◆ <strong>수 강 료</strong> : 무료(일부 프로그램 재료비가 있으니 내용 확인 부탁드립니다.)</p>
                        <p>◆ <strong>참가비 및 재료비 입금방법</strong> : 참여 확정 후 별도 공지</p>
                        <p>- 수업이 시작되면 참가비 및 재료비 환불은 불가합니다.</p>
                        <p>◆ <strong>문 의</strong> : ☎ 031-999-3987</p>
                        <p>◆ <strong>교육 상세내용은 첨부파일을 확인해 주세요!</strong></p>
                        <p>&nbsp;</p>
                        <p>◆ <strong>기타안내</strong></p>
                        <p>- &lt;반려동물 소품 만들기&gt; : 김포국제조각공원 내 '김포평화문화관'에서 진행예정입니다.</p>
                        <p>- &lt;원데이클래스: 컬러비즈 냉장고 자석 만들기&gt; : 통진두레단오제 참여 시민 누구나 무료로 참여가능합니다.</p>
                        <p>(70명 한정, 재료 소진 시 마감)</p>
                        <p>&nbsp;</p>

                        <p>
                            <img src={poster.etc} alt={poster.title} className="off_detail_poster_image" />
                        </p>
                    </div>

                    <div id="off_tea_info_board" ref={Off_teacher_info_ref} className='off_tea_info_board'>

                        <p>강사 소개</p>
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
                </div>

            </div>

        </div>
    );



}

export default SelectDetails;
