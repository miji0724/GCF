import React, { useState } from 'react';
import SideMenu from './ManageSideMenu';
import './ManageLecOffDetail.css';
import { DateRangePicker } from 'react-date-range';
import 'react-calendar/dist/Calendar.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import 'react-time-picker/dist/TimePicker.css';

function ManageLecOffDetail() {

    const [phoneNumber, setPhoneNumber] = useState('');

    const autoHypenPhone = (str) => {
        str = str.replace(/[^0-9]/g, '');
        let tmp = '';
        if (str.length < 4) {
            return str;
        } else if (str.length < 7) {
            tmp += str.substr(0, 3) + '-';
            tmp += str.substr(3);
            return tmp;
        } else if (str.length < 11) {
            tmp += str.substr(0, 3) + '-';
            tmp += str.substr(3, 3) + '-';
            tmp += str.substr(6);
            return tmp;
        } else {
            tmp += str.substr(0, 3) + '-';
            tmp += str.substr(3, 4) + '-';
            tmp += str.substr(7);
            return tmp;
        }
    };

    const handlePhoneNumberChange = (event) => {
        const value = event.target.value;
        setPhoneNumber(autoHypenPhone(value));
    };
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedOperateStartDate, setSelectedOperateStartDate] = useState(new Date());
    const [selectedOperateEndDate, setSelectedOperateEndDate] = useState(new Date());
    const [selectedRecruitStartDate, setSelectedRecruitStartDate] = useState(new Date());
    const [selectedRecruitEndDate, setSelectedRecruitEndDate] = useState(new Date());
    const [startHour, setStartHour] = useState("06:00");
    const [endHour, setEndHour] = useState("07:00");

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    };

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

    return (
        <body>
            <div className='lecOffDetail_container'>
                <SideMenu />
                <div className='lecOffDetail'>
                    <p>강의 상세정보(오프라인)</p>
                    <div className='lecOffDetail_area'>
                        <div className='lecOffDetail_left'>
                            <ul>
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
                                <li>&nbsp;</li>
                                <li>&nbsp;</li>
                                <li>&nbsp;</li>
                                <li>&nbsp;</li>
                                <li>&nbsp;</li>
                                <li>&nbsp;</li>
                                <li>&nbsp;</li>
                                <li>&nbsp;</li>
                                <li>* 모집기간</li>
                                <li>&nbsp;</li>
                                <li>&nbsp;</li>
                                <li>&nbsp;</li>
                                <li>&nbsp;</li>
                                <li>&nbsp;</li>
                                <li>* 참가료</li>
                                <li>문의 전화번호</li>
                            </ul>
                        </div>
                        <div className='lecOffDetail_right'>
                            <ul>
                                <li> <input type='text' id='lecOffDetail_name' /></li>
                                <li> <input type="text" id='lecOffDetail_phoneNum' maxLength="13" value={phoneNumber} onChange={handlePhoneNumberChange} /></li>
                                <li> <input type="text" id='lecOffDetail_landNum' maxLength="11" /> </li>
                                <li>
                                    <input type='text' id='lecOffDetail_emailId' />
                                    &nbsp;@&nbsp;
                                    <input type='text' id='lecOffDetail_emailAddr' />
                                    <select id='lecOffDetail_email_dropdown'>
                                        <option value="direct_input">직접입력</option>
                                        <option value="naver_input">naver.com</option>
                                    </select>
                                </li>
                                <li><input type='file' id='lecOffDetail_poster_attachment' /></li>
                                <div className='introduceEdu_buttonAlign'>
                                    <div className='introduceEdu_area'>
                                        {eduInputs.map(input => (
                                            <div key={input.id} className='introduceEdu_flexArea'>
                                                <li>
                                                    <input type='text' id={`lecOffDetail_introduceEdu_detail_${input.id}`} />
                                                    <button onClick={() => handleRemoveEduInput(input.id)} style={{
                                                        width: "30px"
                                                        , height: "30px"
                                                        , backgroundColor: "#FF8585"
                                                        , margin: "0 10px"
                                                    }}>-</button>
                                                </li>
                                                <li>
                                                    <input type='file' className='introduceEdu_attachment' id={`lecOffDetail_introduceEdu_attachment_${input.id}`} />
                                                </li>
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={handleAddEduInput} style={{
                                        float: "right"
                                        , width: "30px"
                                        , height: "30px"
                                        , marginLeft: "10px"
                                        , backgroundColor: "#EDEDED"
                                    }}>+</button>
                                </div>

                                <div className='introduceTeach_buttonAlign'>
                                    <div className='introduceTeach_area'>
                                        {teachInputs.map(input => (
                                            <div key={input.id} className='introduceTeach_flexArea'>
                                                <li>
                                                    <input type='text' id={`lecOffDetail_introduceTeach_detail_${input.id}`} />
                                                    <button onClick={() => handleRemoveTeachInput(input.id)} style={{
                                                        width: "30px"
                                                        , height: "30px"
                                                        , backgroundColor: "#FF8585"
                                                        , margin: "0 10px"
                                                    }}>-</button>
                                                </li>
                                                <li>
                                                    <input type='file' className='introduceTeach_attachment' id={`lecOffDetail_introduceTeach_attachment_${input.id}`} />
                                                </li>
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={handleAddTeachInput} style={{
                                        float: "right"
                                        , width: "30px"
                                        , height: "30px"
                                        , marginLeft: "10px"
                                        , backgroundColor: "#EDEDED"
                                    }}>+</button>
                                </div>

                                <li>
                                    <select id='lecOffDetail_lecField'>{/*문학 미술 음악 무용 영상 연극 영화 국악 건축 출판 만화*/}

                                        <option value='art'>미술</option>
                                        <option value='science'>과학</option>
                                        <option value='music'>음악</option>
                                        <option value='design'>디자인</option>
                                        <option value='education'>교육</option>
                                        <option value='etc'>기타</option>
                                    </select>
                                </li>
                                <li>
                                    <select value={selectedLocation} onChange={handleLocationChange}>
                                        <option value="">장소 선택</option>
                                        <option value="김포아트빌리지">김포아트빌리지</option>
                                        <option value="통진두레문화센터">통진두레문화센터</option>
                                        <option value="김포국제조각공원">김포국제조각공원</option>
                                        <option value="월곶생활문화센터">월곶생활문화센터</option>
                                        <option value="김포평화문화관">김포평화문화관</option>
                                        <option value="작은미술관 보구곶">작은미술관 보구곶</option>
                                        <option value="애기봉평화생태공원">애기봉평화생태공원</option>
                                        {/* 다른 장소들에 대한 옵션 추가 */}
                                    </select>
                                </li>
                                <li className='lecOffDetail_program'>
                                    <ul>
                                        <li>*운영기간</li>
                                        <li>&nbsp;</li>
                                        <li>&nbsp;</li>
                                        <li>&nbsp;</li>
                                        <li>&nbsp;</li>
                                        <li>&nbsp;</li>
                                        <li>&nbsp;</li>
                                        <li className="marginTop10">*운영요일</li>
                                        <li>*운영시간</li>
                                        <li>*신청가능인원</li>
                                        <li>*대상</li>
                                        <li>*상세프로그램명</li>
                                        <li>비고</li>
                                    </ul>
                                    <ul>
                                        <li>
                                            {/* 선택된 날짜 출력 */}
                                            {selectedOperateStartDate.toLocaleDateString()} - {selectedOperateEndDate.toLocaleDateString()}
                                        </li>
                                        <li className="oCalendar">
                                            <DateRangePicker
                                                onChange={handleOperateDateRangeChange}
                                                ranges={[{ startDate: selectedOperateStartDate, endDate: selectedOperateEndDate, key: 'oSelection' }]}
                                            />
                                        </li>

                                        <li>
                                            <select id='lecOffDetail_dayoftheWeek'>{/*일 월 화 수 목 금 토*/}

                                                <option value='sun'>일</option>
                                                <option value='mon'>월</option>
                                                <option value='tues'>화</option>
                                                <option value='wednes'>수</option>
                                                <option value='thurs'>목</option>
                                                <option value='fri'>금</option>
                                                <option value='satur'>토</option>
                                            </select>
                                        </li>
                                        <li>
                                            <select value={startHour} onChange={(e) => setStartHour(e.target.value)}>
                                                {[...Array(17)].map((_, index) => {
                                                    const hour = index + 6;
                                                    const formattedHour = hour.toString().padStart(2, '0');
                                                    return <option key={hour} value={`${formattedHour}:00`}>{`${formattedHour}:00`}</option>;
                                                })}
                                            </select>
                                            &nbsp;~&nbsp;
                                            <select value={endHour} onChange={(e) => setEndHour(e.target.value)}>
                                                {[...Array(17)].map((_, index) => {
                                                    const hour = index + 7;
                                                    const formattedHour = hour.toString().padStart(2, '0');
                                                    return <option key={hour} value={`${formattedHour}:00`}>{`${formattedHour}:00`}</option>;
                                                })}
                                            </select>
                                        </li>
                                        <li>
                                            <select id='dupApp'>{/*일 월 화 수 목 금 토*/}

                                                <option value='sun'>일</option>
                                                <option value='mon'>월</option>
                                                <option value='tues'>화</option>
                                                <option value='wednes'>수</option>
                                                <option value='thurs'>목</option>
                                                <option value='fri'>금</option>
                                                <option value='satur'>토</option>
                                            </select>
                                        </li>
                                        <li>
                                            <div className="lecOffDetail_targetRadioWrapper">
                                                <input type='radio' name='target' value='adult' /> 성인
                                                <input type='radio' name='target' value='child' /> 어린이
                                            </div>
                                        </li>
                                        <li> <input type='text' id='lecOffDetail_progDetailName' /></li>
                                        <li> <input type='text' id='lecOffDetail_note' /></li>
                                    </ul>
                                </li>
                                <li className="rCalendar">
                                    <DateRangePicker
                                        onChange={handleRecruitDateRangeChange}
                                        ranges={[{ startDate: selectedRecruitStartDate, endDate: selectedRecruitEndDate, key: 'rSelection' }]}
                                    />
                                </li>
                                <li>
                                    <div className="lecOffDetail_costWrapper">
                                        <input type='radio' name='cost' value='O' /> 프로그램별 상이
                                        <input type='radio' name='cost' value='X' /> X
                                        <p>※ 참가료 소요 시 각 비고란에 직접 안내 필요</p>
                                    </div>
                                </li>
                                <li> <input type='text' id='lecOffDetail_contactNum' maxLength="11" /></li>
                            </ul>
                        </div>
                    </div>
                    <div className='lecOffDetail_button_area'>
                        <button id='lecOffDetail_confirm'>수정</button>
                        <button id='lecOffDetail_delete'>삭제</button>
                    </div>
                </div>
            </div>
        </body>
    );
}

export default ManageLecOffDetail;
