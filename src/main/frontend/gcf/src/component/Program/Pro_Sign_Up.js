import React, { useState, useEffect } from 'react';
import './Pro_Sign_Up.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Pro_Sign_Up({ isLoggedIn, userId }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [poster, setPoster] = useState(null);
    const [isAgree, setIsAgree] = useState(false); // 체크박스 상태 관리

    useEffect(() => {
        const fetchPoster = async () => {
            try {
                const response = await axios.get(`/api/offProgram/${id}`);
                setPoster(response.data);
            } catch (error) {
                console.error('포스터 정보를 불러오지 못했습니다.', error);
            }
        };
        fetchPoster();
    }, [id]);

    if (!poster) {
        return <div>포스터 정보를 찾을 수 없습니다.</div>;
    }

    const handleCheckboxChange = (event) => {
        setIsAgree(event.target.checked);
    };

    const handleSignUpClick = async () => {
        if (!isAgree) {
            alert('본인(보호자)의 개인정보 수집 및 이용에 동의해 주셔야 신청이 가능합니다.');
            return;
        }
        else if (!isLoggedIn) {

            alert('로그인 후 이용해주세요.');
            navigate('/login');
            return;
        }


        try {
            await axios.post(`/api/offProgram/${id}/signup`, {
                userId: userId
            });
            console.log(userId);
            const userConfirmed = window.confirm('수강신청이 접수되었습니다. 마이페이지로 이동하시겠습니까?');
            if (userConfirmed) {
                navigate(`/mypage`); // 마이페이지 경로로 이동
            } else {
                navigate(`/details/${id}/signup`); // 프로그램 신청 경로
            }
        } catch (error) {
            console.error('신청을 처리하지 못했습니다.', error);
            alert('신청을 처리하지 못했습니다. 다시 시도해 주세요.');
        }
    };

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


    return (
        <div className='inner'>
            <div className='pro_application'>
                <div className='titleBox'>
                    <div className="off_app_box">
                        <p className="off_title_name"><span>프로그램명</span></p>
                        <h2 className="poster-detail-title">{poster.programName}</h2>
                    </div>
                </div>

                <div className="off_app_box">
                    <div>
                        <p className="off_title_name"><span>프로그램</span></p>
                    </div>
                    <div className='off_table'>
                        <table className='off_table_info'>
                            <colgroup>
                                <col style={{ width: "135px" }} />
                                <col />
                                <col style={{ width: "100px" }} />
                                <col style={{ width: "70px" }} />
                                <col style={{ width: "100px" }} />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>상세프로그램명</th>
                                    <th>운영일정</th>
                                    <th>시간</th>
                                    <th>참가료</th>
                                    <th>카테고리</th>
                                    <th>운영장소</th>
                                    <th>운영요일</th>
                                    <th>신청현황</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="align-left">{poster.programName}</td>
                                    <td>{formatDate(poster.applicationStartDate)} ~ {formatDate(poster.applicationEndDate)}</td>
                                    <td>{formatTime(poster.startTime)} ~ {formatTime(poster.endTime)}</td>
                                    <td>{poster.participationFee}</td>
                                    <td>{poster.category}</td>
                                    <td>{poster.placeName}</td>
                                    <td>{poster.dayOfWeek}</td>
                                    <td>
                                        <span className="cm_color1">{poster.currentParticipants}명</span><br />
                                        /{poster.maxParticipants}명
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <p className="off_title_name"><span>신청 정보</span></p>

                <div className="info-box">
                    <div className="info-title">📢신청 시 유의사항</div>
                    <ul className="info-content">
                        <li>반드시 프로그램 참여자(1인)의 정보를 입력해 주시기 바랍니다.</li>
                        <li>참여자가 14세 미만인 경우, 개인정보보호법에 따른 보호자의 동의가 필요합니다.</li>
                        <li>신청자 정보란에는 참여자(어린이)의 정보를 기입하고 자동으로 생성되는 보호자 정보란도 입력해주시기 바랍니다.</li>
                        <li>보호자 정보 입력 : 개인정보 처리에 대한 동의 O / 프로그램 신청 접수 X</li>
                        <li>1개의 회원 아이디로 여러명 대리신청이 가능하며, 반드시 각 참여자(1인) 성명을 정확하게 입력해주셔야 합니다.</li>
                    </ul>
                </div>

                <div className="cm_agree">
                    <div className="textarea_box">
                        <textarea
                            className="form_control"
                            readOnly
                            defaultValue={`김포문화재단은 교육·체험 프로그램 신청 시 아래와 같은 개인정보를 수집하고 있습니다.
1. 수집 목적
- 프로그램 관련 서비스 제공 및 안내
2. 수집하려는 개인정보 항목
- 필수 : 성명, 생년월일, 성별, 휴대폰 번호, 이메일, 주소
3. 개인정보 보유 및 이용 기간 : 해당 프로그램 종료 시까지
4. 사진 및 영상물 촬영 등 관련 초상 이용 동의
- 촬영목적 : 프로그램 참여 전반의 사진/영상 기록 및 홍보 자료 활용
- 촬영사항 : 참여자 대상 사진 및 영상 촬영 등
- 활용처 : 김포문화재단 홈페이지, 보도자료, SNS, 홍보책자 등 홍보물 및 내부 보고 자료
- 기타사항 : 공공의 목적으로 활용되며, 이외 상업적인 목적으로는 사용하지 않습니다.
5. 개인정보 수입, 이용법적 근거 : 개인정보 보호법 제15조(개인정보의 수집·이용), 제18조(개인정보의 이용·제공 제한), 제22조(동의를 받는 방법), 제24조, 표준 개인정보 보호 지침 제9조 (개인정보의 목적 외 이용 등)
※ 개인정보 수집 동의에 거부하실 수 있으며, 동의 거부 시 프로그램 신청이 제한됩니다.`}
                        />
                    </div>
                    <div className="form_check">
                        <input type="checkbox" id="chk_agree1" name="chk_agree1" value="Y" checked={isAgree} onChange={handleCheckboxChange} />
                        <label htmlFor="chk_agree1" className="form_label">본인(보호자)의 개인정보 수집 및 이용에 동의합니다.</label>
                    </div>
                </div>

                <div className='Sing_button_area'>
                    <button className="SignButton" onClick={handleSignUpClick}>
                        <span>신청하기</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Pro_Sign_Up;
