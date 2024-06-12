import React, { useState, useEffect } from 'react';
import SideMenu from './ManageSideMenu';
import './ManageLecOffDetail.css';
import { DateRangePicker } from 'react-date-range';
import 'react-calendar/dist/Calendar.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import 'react-time-picker/dist/TimePicker.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ManageLecOffDetail() {

    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedOperateStartDate, setSelectedOperateStartDate] = useState(new Date());
    const [selectedOperateEndDate, setSelectedOperateEndDate] = useState(new Date());
    const [selectedRecruitStartDate, setSelectedRecruitStartDate] = useState(new Date());
    const [selectedRecruitEndDate, setSelectedRecruitEndDate] = useState(new Date());
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    const { item } = state || {};

    const [offLecInfo, setOffLecInfo] = useState({
        id: '',
        programName: '',
        poster: {
            id: '',
            original_name: '',
            file_name: '',
            file_path: '',
            parent: '',
        },
        programInfos: [],
        teacherInfos: [],
        category: '',
        placeName: '',
        programType: '',
        operatingStartDay: '',
        operatingEndDay: '',
        dayOfWeek: '',
        startTime: '',
        endTime: '',
        maxParticipants: '',
        programDetailName: '',
        applictaionStartDate: '',
        applicationEndDate: '',
        participationFee: '',
        application_info: '',
        applicationState: '',
        teacher: {
            member: {
                name: '',
                phone_number: '',
                tel_number: '',
                email: '',
            }
        },
        views: 0,
        likesCount: 0,
    });

    useEffect(() => {
        if (item) {
            setOffLecInfo(item);
            console.log(item);
            // Date fields conversion
            if (Array.isArray(item.operatingStartDay)) {
                setSelectedOperateStartDate(new Date(item.operatingStartDay[0], item.operatingStartDay[1] - 1, item.operatingStartDay[2]));
            }
            if (Array.isArray(item.operatingEndDay)) {
                setSelectedOperateEndDate(new Date(item.operatingEndDay[0], item.operatingEndDay[1] - 1, item.operatingEndDay[2]));
            }
            if (Array.isArray(item.applicationStartDate)) {
                setSelectedRecruitStartDate(new Date(item.applicationStartDate[0], item.applicationStartDate[1] - 1, item.applicationStartDate[2]));
            }
            if (Array.isArray(item.applicationEndDate)) {
                setSelectedRecruitEndDate(new Date(item.applicationEndDate[0], item.applicationEndDate[1] - 1, item.applicationEndDate[2]));
            }
        }
    }, [item]);

    const handleOperateDateRangeChange = (ranges) => {
        const { oSelection } = ranges;
        setSelectedOperateStartDate(oSelection.startDate);
        setSelectedOperateEndDate(oSelection.endDate);
    };

    const handleRecruitDateRangeChange = (ranges) => {
        const { rSelection } = ranges;
        setSelectedRecruitStartDate(rSelection.startDate);
        setSelectedRecruitEndDate(rSelection.endDate);
    };

    // State for managing 'introduceEdu' input sets
    const [eduInputs, setEduInputs] = useState([{ id: 1 }]);

    // State for managing 'introduceTeach' input sets
    const [teachInputs, setTeachInputs] = useState([{ id: 1 }]);

    // Function to add a new 'introduceEdu' input set
    const handleAddEduInput = () => {
        setEduInputs([...eduInputs, { id: eduInputs.length + 1 }]);
    };
    // Function to remove an 'introduceEdu' input set
    const handleRemoveEduInput = (id) => {
        setEduInputs(eduInputs.filter(input => input.id !== id));
    };

    // Function to add a new 'introduceTeach' input set
    const handleAddTeachInput = () => {
        setTeachInputs([...teachInputs, { id: teachInputs.length + 1 }]);
    };

    // Function to remove an 'introduceTeach' input set
    const handleRemoveTeachInput = (id) => {
        setTeachInputs(teachInputs.filter(input => input.id !== id));
    };

    // 삭제
    const deleteOffProgram = () => {
        // 사용자에게 경고 메시지를 표시하고 확인 여부를 물어봅니다.
        const isConfirmed = window.confirm('정말 강의를 삭제하시겠습니까?');
    
        // 사용자가 확인을 누른 경우에만 삭제 요청을 보냅니다.
        if (isConfirmed) {
            axios.delete(`/manage/deleteOffProgram/${offLecInfo.id}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                alert('강의를 삭제했습니다.');
                navigate(-1);
            })
            .catch(error => {
                console.error('axios 작업 중 문제가 발생했습니다:', error);
                // 오류 처리 로직을 추가할 수 있습니다.
            });
        }
    };

    return (
        <body>
            <div className='lecOffDetail_container'>
                <SideMenu />
                <div className='lecOffDetail'>
                    <p>강의 상세정보(오프라인)</p>
                    <a className='back_button' href='javascript:history.back()'>목록으로 돌아가기 &gt;</a>
                    <div className='lecOffDetail_area'>
                        <div className='lecOffDetail_left'>
                            <ul>
                                <li>* 강의 제목</li>
                                <li>* 강사 이름</li>
                                <li>* 휴대폰 번호</li>
                                <li>전화번호</li>
                                <li>* 강사 이메일</li>
                                <li>* 교육 배너 포스터</li>
                                <li>* 교육 소개</li>
                                <li>&nbsp;</li>
                                <li>&nbsp;</li>
                                <li className="marginTop25">강사 소개</li>
                                <li>&nbsp;</li>
                                <li>&nbsp;</li>
                                <li>* 강의 분야</li>
                                <li>* 운영 장소</li>
                                <li>* 운영 목록</li>
                                <li>&nbsp;</li>
                                <li>&nbsp;</li>
                                <li>&nbsp;</li>
                                <li>&nbsp;</li>
                                <li>&nbsp;</li>
                                <li>* 모집기간</li>
                                <li>* 참가료</li>
                                <li>모집 안내</li>
                            </ul>
                        </div>
                        <div className='lecOffDetail_right'>
                            <ul>
                                <li> <input type='text' id='lecOffDetail_lecTitle' value={offLecInfo.programName} readOnly /></li>
                                <li> <input type='text' id='lecOffDetail_name' value={offLecInfo.teacher.member.name} readOnly /></li>
                                <li> <input type="text" id='lecOffDetail_phoneNum' maxLength="13" value={offLecInfo.teacher.member.phone_number} readOnly /></li>
                                <li> <input type="text" id='lecOffDetail_landNum' maxLength="11" value={offLecInfo.teacher.member.tel_number} readOnly /> </li>
                                <li>
                                    <input type='text' id='lecOffDetail_emailId' value={offLecInfo.teacher.member.email.split('@')[0]} readOnly />
                                    &nbsp;@&nbsp;
                                    <input type='text' id='lecOffDetail_emailAddr' value={offLecInfo.teacher.member.email.split('@')[1]} readOnly />
                                </li>
                                <li><input type='text' id='lecOffDetail_poster_attachment' value={offLecInfo.poster.original_name} readOnly /></li>
                                <div className='introduceEdu_buttonAlign'>
                                    <div className='introduceEdu_area'>
                                        {offLecInfo.programInfos.map((programInfo, index) => (
                                            <div key={index} className='introduceEdu_flexArea'>
                                                <li>
                                                    <input
                                                        type='text'
                                                        id={`lecOffDetail_introduceEdu_detail_${index}`}
                                                        value={programInfo.description}
                                                        readOnly
                                                    />
                                                </li>
                                                <li>
                                                    <input
                                                        type='text'
                                                        value={programInfo.attachment.original_name}
                                                        id={`lecOffDetail_introduceEdu_attachment_${index}`}
                                                        readOnly
                                                    />
                                                </li>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className='introduceTeach_buttonAlign'>
                                    <div className='introduceTeach_area'>
                                        {offLecInfo.teacherInfos.map((teacherInfo, index) => (
                                            <div key={index} className='introduceTeach_flexArea'>
                                                <li>
                                                    <input
                                                        type='text'
                                                        id={`lecOnAppDetail_introduceTeach_detail_${index}`}
                                                        value={teacherInfo.description}
                                                        readOnly
                                                    />
                                                </li>
                                                <li>
                                                    <input
                                                        type='text'
                                                        value={teacherInfo.attachment.original_name}
                                                        id={`lecOnAppDetail_introduceTeach_attachment_${index}`}
                                                        readOnly
                                                    />
                                                </li>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <li>
                                    <select id='lecOffDetail_lecField' value={offLecInfo.category} disabled>
                                        <option value='체험'>체험</option>
                                        <option value='교육'>교육</option>
                                    </select>
                                </li>
                                <li>
                                    <select value={offLecInfo.placeName} disabled>
                                        <option value="">장소 선택</option>
                                        <option value="김포아트빌리지">김포아트빌리지</option>
                                        <option value="통진두레문화센터">통진두레문화센터</option>
                                        <option value="김포국제조각공원">김포국제조각공원</option>
                                        <option value="월곶생활문화센터">월곶생활문화센터</option>
                                        <option value="김포평화문화관">김포평화문화관</option>
                                        <option value="작은미술관 보구곶">작은미술관 보구곶</option>
                                        <option value="애기봉평화생태공원">애기봉평화생태공원</option>
                                    </select>
                                </li>
                                <li className='lecOffDetail_program'>
                                    <ul>
                                        <li>*운영기간</li>
                                        <li>*운영요일</li>
                                        <li>*운영시간</li>
                                        <li>*신청가능인원</li>
                                        <li>*상세프로그램명</li>
                                    </ul>
                                    <ul>
                                        <li>
                                            {selectedOperateStartDate.toLocaleDateString()} - {selectedOperateEndDate.toLocaleDateString()}
                                        </li>
                                        <li>
                                            <select id='lecOffDetail_dayoftheWeek' value={offLecInfo.dayOfWeek} disabled>
                                                <option value='일요일'>일</option>
                                                <option value='월요일'>월</option>
                                                <option value='화요일'>화</option>
                                                <option value='수요일'>수</option>
                                                <option value='목요일'>목</option>
                                                <option value='금요일'>금</option>
                                                <option value='토요일'>토</option>
                                            </select>
                                        </li>
                                        <li>
                                            <input
                                                type='text'
                                                value={`${offLecInfo.startTime[0]}:${offLecInfo.startTime[1] < 10 ? '0' + offLecInfo.startTime[1] : offLecInfo.startTime[1]}`}
                                                style={{ width: "100px" }}
                                                readOnly
                                            />
                                            &nbsp;~&nbsp;
                                            <input
                                                type='text'
                                                value={`${offLecInfo.endTime[0]}:${offLecInfo.endTime[1] < 10 ? '0' + offLecInfo.endTime[1] : offLecInfo.endTime[1]}`}
                                                style={{ width: "100px" }}
                                                readOnly
                                            />
                                        </li>
                                        <li>
                                            <input type='text' id='maxParticipants' value={offLecInfo.maxParticipants} readOnly />
                                        </li>
                                        <li> <input type='text' id='lecOffDetail_progDetailName' value={offLecInfo.programDetailName} readOnly /></li>
                                    </ul>
                                </li>
                                <li className="rCalendar">
                                    {selectedRecruitStartDate.toLocaleDateString()} - {selectedRecruitEndDate.toLocaleDateString()}
                                </li>
                                <li>
                                    <div className="lecOffDetail_costWrapper" value={offLecInfo.participationFee} >
                                        <input
                                            type='radio'
                                            name='cost'
                                            value='프로그램별상이'
                                            checked={offLecInfo.participationFee === '프로그램별상이'}
                                            onChange={() => { }} // Placeholder for handling change event
                                            disabled
                                        /> 프로그램별상이
                                        <input
                                            type='radio'
                                            name='cost'
                                            value='무료'
                                            checked={offLecInfo.participationFee === '무료'}
                                            onChange={() => { }} // Placeholder for handling change event
                                            disabled
                                        /> 무료
                                        <p>※ 참가료 소요 시 각 비고란에 직접 안내 필요</p>
                                    </div>
                                </li>
                                <li> <textarea className='lecOffDetail_contactInfo' value={offLecInfo.application_info} readOnly></textarea></li>
                            </ul>
                        </div>
                    </div>
                    <div className='lecOffDetail_button_area'>
                        <button id='lecOffDetail_delete' onClick={deleteOffProgram}>삭제</button>
                    </div>
                    {offLecInfo.teacherInfos.map((teacherInfo, index) => (
                        <div key={index} className='introduceTeach_attArea'>
                            <img src={teacherInfo.attachment.file_path} />
                        </div>
                    ))}
                    {offLecInfo.programInfos.map((programInfo, index) => (
                        <div key={index} className='introduceTeach_attArea'>
                            <img src={programInfo.attachment.file_path} />
                        </div>
                    ))}
                    {offLecInfo.videos.map((video, index) => (
                        video.attachment ? (
                            <div key={index} className='introduceTeach_attArea'>
                                <video controls width="500">
                                    <source src={video.attachment.file_path} type="video/mp4" />
                                </video>
                            </div>
                        ) : null
                    ))}
                </div>
            </div>
        </body>
    );
}

export default ManageLecOffDetail;