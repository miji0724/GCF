import React, { useState } from "react";
import './ClassForm.css';
import 'react-calendar/dist/Calendar.css';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import 'react-time-picker/dist/TimePicker.css';
import ManageLecOnDetail from "./ManageLecOnDetail";



function ClassForm() {

    const [certificationFields, setCertificationFields] = useState([{ certification: '' }]);
    const [teachingSubjectFields, setTeachingSubjectFields] = useState([{ subject: '' }]);
    const [certificationFiles, setCertificationFiles] = useState([]);
    const [teachingSubjectFiles, setTeachingSubjectFiles] = useState([]);
    const [bannerFields, setBannerFields] = useState([{ subject: '', file: null }]);
    const [selectedItem, setSelectedItem] = useState("");
    const [onlineEducation, setOnlineEducation] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState("");
    const [startHour, setStartHour] = useState("06:00");
    const [endHour, setEndHour] = useState("07:00");
    const [programFee, setProgramFee] = useState("");
    const [offlineLocationStartDate, setOfflineLocationStartDate] = useState(new Date());
    const [offlineLocationEndDate, setOfflineLocationEndDate] = useState(new Date());
    const [PeriodofflineLocationStartDate, PeriodsetOfflineLocationStartDate] = useState(new Date());
    const [PeriodofflineLocationEndDate, PeriodsetOfflineLocationEndDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState("");
    const [numberOfApplicants, setNumberOfApplicants] = useState("");

    const handleAddCertificationField = () => {
        const newCertificationFields = [...certificationFields, { certification: '' }];
        setCertificationFields(newCertificationFields);
    };

    const handleRemoveCertificationField = (index) => {
        const newCertificationFields = [...certificationFields];
        newCertificationFields.splice(index, 1);
        setCertificationFields(newCertificationFields);
    };

    const handleCertificationChange = (event, index) => {
        const { value } = event.target;
        const newCertificationFields = [...certificationFields];
        newCertificationFields[index].certification = value;
        setCertificationFields(newCertificationFields);
    };

    const handleAddTeachingSubjectField = () => {
        const newTeachingSubjectFields = [...teachingSubjectFields, { subject: '' }];
        setTeachingSubjectFields(newTeachingSubjectFields);
    };

    const handleRemoveTeachingSubjectField = (index) => {
        const newTeachingSubjectFields = [...teachingSubjectFields];
        newTeachingSubjectFields.splice(index, 1);
        setTeachingSubjectFields(newTeachingSubjectFields);
    };

    const handleTeachingSubjectChange = (event, index) => {
        const { value } = event.target;
        const newTeachingSubjectFields = [...teachingSubjectFields];
        newTeachingSubjectFields[index].subject = value;
        setTeachingSubjectFields(newTeachingSubjectFields);
    };

    const handleCertificationFileChange = (event, index) => {
        const files = event.target.files;
        const newCertificationFiles = [...certificationFiles];
        newCertificationFiles[index] = files[0];
        setCertificationFiles(newCertificationFiles);
    };

    const handleTeachingSubjectFileChange = (event, index) => {
        const files = event.target.files;
        const newTeachingSubjectFiles = [...teachingSubjectFiles];
        newTeachingSubjectFiles[index] = files[0];
        setTeachingSubjectFiles(newTeachingSubjectFiles);
    };

    const handleBannerFileChange = (event, index) => {
        const file = event.target.files[0];
        const newBannerFields = [...bannerFields];
        newBannerFields[index].file = file;
        setBannerFields(newBannerFields);
    };

    const handleAddBannerField = () => {
        const newBannerFields = [...bannerFields, { subject: '', file: null }];
        setBannerFields(newBannerFields);
    };

    const handleRemoveBannerField = (index) => {
        const newBannerFields = [...bannerFields];
        newBannerFields.splice(index, 1);
        setBannerFields(newBannerFields);
    };

    const handleDropdownChange = (event) => {
        setSelectedItem(event.target.value);
    };

    const handleOnlineEducationChange = (event) => {
        setOnlineEducation(event.target.checked);
    };

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    };

    const handleProgramFeeChange = (event) => {
        setProgramFee(event.target.value);
    };

    const [programNames, setProgramNames] = useState([""]);

    const addProgramName = () => {
        setProgramNames([...programNames, ""]);
    };

    const removeProgramName = (index) => {
        const newProgramNames = [...programNames];
        newProgramNames.splice(index, 1);
        setProgramNames(newProgramNames);
    };

    const handleProgramNameChange = (index, value) => {
        const newProgramNames = [...programNames];
        newProgramNames[index] = value;
        setProgramNames(newProgramNames);
    };

    const [duplicateApply, setDuplicateApply] = useState("O"); // 초기값은 O로 설정할 수 있습니다.
    const [targetAudience, setTargetAudience] = useState("adult"); // 초기값은 성인으로 설정할 수 있습니다.

    const handleNumberOfApplicantsChange = (event) => {
        const { value } = event.target;
        // 숫자만 입력되도록 정규식을 사용하여 유효성을 검사할 수 있습니다.
        if (/^\d*$/.test(value) || value === "") {
            setNumberOfApplicants(value);
        }
    };


    return (
        <div className='All' >
            <div className="May">
                <div className='ClassFormContainer'>
                    <div className='ClassFContainer'>
                        <div className='ClassFState'>강의 등록 신청서</div>
                    </div>
                    <div className="whiteBox">
                        
                        <form> 
                            <h4>강의정보</h4>

                            <div>
                                <h5>교육 상세 프로그램명 선택*</h5>
                                {/* 드롭다운 메뉴 */}
                                <select value={selectedItem} onChange={handleDropdownChange}>
                                    <option value="교육/체험">교육/체험 선택</option>
                                    <option value="교육">교육</option>
                                    <option value="체험">체험</option>
                                </select>
                                {/* 선택된 항목 출력 */}

                                <label>
                                    <input
                                        type="checkbox"
                                        checked={onlineEducation}
                                        onChange={handleOnlineEducationChange}
                                    />
                                    온라인 교육
                                </label>
                            </div>

                            <div className='InfoGroup'>
                                <label htmlFor='Info'>교육 소개:</label>
                                {certificationFields.map((field, index) => (
                                    <div key={index} className="certificationField">
                                        <input
                                            type='text'
                                            placeholder="교육 소개"
                                            value={field.certification}
                                            onChange={(event) => handleCertificationChange(event, index)}
                                        />
                                        <input
                                            type="file"
                                            onChange={(event) => handleCertificationFileChange(event, index)}
                                        />
                                        {index === 0 ? (
                                            <button type='button' onClick={handleAddCertificationField}>+</button>
                                        ) : (
                                            <button type='button' onClick={() => handleRemoveCertificationField(index)}>-</button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* 강의 가능 분야 입력란 */}
                            <div className='TeachInfoGroup'>
                                <label htmlFor='teachingSubjects'>강사 소개:</label>
                                {teachingSubjectFields.map((field, index) => (
                                    <div key={index} className="teachingSubjectField">
                                        <input
                                            type='text'
                                            
                                            value={field.subject}
                                            onChange={(event) => handleTeachingSubjectChange(event, index)}
                                        />
                                        <input
                                            type="file"
                                            onChange={(event) => handleTeachingSubjectFileChange(event, index)}
                                        />
                                        {index === 0 ? (
                                            <button type='button' onClick={handleAddTeachingSubjectField}>+</button>
                                        ) : (
                                            <button type='button' onClick={() => handleRemoveTeachingSubjectField(index)}>-</button>
                                        )}
                                    </div>
                                ))}

                                {/* 교육 배너 포스터 입력란 */}
                                <div className='BannerInfoGroup'>
                                    <label htmlFor='BannerSubjects'>교육 배너 포스터*:</label>
                                    {bannerFields.map((field, index) => (
                                        <div key={index} className="BannerSubjectField">
                                            <input
                                                type="file"
                                                onChange={(event) => handleBannerFileChange(event, index)}
                                            />
                                            {index !== 0 && (
                                                <button type='button' onClick={() => handleRemoveBannerField(index)}>-</button>
                                            )}
                                        </div>
                                    ))}
                                    
                                </div>

                                {/* 교육 배너 포스터 입력란 */}
                            </div>

                            
                            <div className="OnlineLec">
                            <h4>온라인 강의</h4>
                            <div><ManageLecOnDetail /></div>
                            </div>
                        
                            <div style={{ display: "flex" }}>

                                {/* 드롭다운 메뉴 */}
                                <div style={{ display: "flex" }}>
                                    {/* 장소 선택 드롭다운 메뉴 */}
                                    <div style={{ marginRight: "20px" }}>
                                        <h4>오프라인 장소 선택</h4>
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
                                    </div>

                                    {/* 날짜 선택 캘린더 */}
                                    <div>
                                        <h5>날짜 선택</h5>
                                        <DateRangePicker
                                            onChange={(ranges) => {
                                                const { selection } = ranges;
                                                setOfflineLocationStartDate(selection.startDate);
                                                setOfflineLocationEndDate(selection.endDate);
                                            }}
                                            ranges={[{ startDate: offlineLocationStartDate, endDate: offlineLocationEndDate, key: 'selection' }]}
                                        />
                                        <p>선택된 날짜: {offlineLocationStartDate.toLocaleDateString()} - {offlineLocationEndDate.toLocaleDateString()}</p>
                                        <p>선택된 시간: {startHour} - {endHour}</p>
                                    </div>

                                    <div style={{ marginRight: "20px" }}>
                                        <h4>Start</h4>
                                        <select value={startHour} onChange={(e) => setStartHour(e.target.value)}>
                                            {[...Array(17)].map((_, index) => {
                                                const hour = index + 6;
                                                const formattedHour = hour.toString().padStart(2, '0');
                                                return <option key={hour} value={`${formattedHour}:00`}>{`${formattedHour}:00`}</option>;
                                            })}
                                        </select>
                                    </div>

                                    <div>
                                        <h4>End</h4>
                                        <select value={endHour} onChange={(e) => setEndHour(e.target.value)}>
                                            {[...Array(17)].map((_, index) => {
                                                const hour = index + 7;
                                                const formattedHour = hour.toString().padStart(2, '0');
                                                return <option key={hour} value={`${formattedHour}:00`}>{`${formattedHour}:00`}</option>;
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* 운영 요일 선택 */}
                            <div>
                                강의 운영 요일: 
                                <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
                                    <option value="">운영 요일 선택</option>
                                    <option value="월요일">월요일</option>
                                    <option value="화요일">화요일</option>
                                    <option value="수요일">수요일</option>
                                    <option value="목요일">목요일</option>
                                    <option value="금요일">금요일</option>
                                    <option value="토요일">토요일</option>
                                    <option value="일요일">일요일</option>
                                </select>
                            </div>

                            <div>
                                {/* 상세프로그램명 입력 인풋들 */}
                                상세프로그램명 입력: 
                                {programNames.map((programName, index) => (
                                    <div key={index}>
                                        <input
                                            type="text"
                                            value={programName}
                                            placeholder="프로그램명"
                                            onChange={(e) => handleProgramNameChange(index, e.target.value)}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div>
                                <label htmlFor="numberOfApplicants">신청 인원:</label>
                                <input
                                    type="text"
                                    id="numberOfApplicants"
                                    name="numberOfApplicants"
                                    placeholder="신청 인원 입력"
                                    value={numberOfApplicants}
                                    onChange={handleNumberOfApplicantsChange}
                                />
                            </div>

                            
                            {/* 달력으로 모집 기간 선택 */}
                            <h4>모집 기간 선택</h4>
                            <DateRangePicker
                                onChange={(ranges) => {
                                    const { selection } = ranges;
                                    PeriodsetOfflineLocationStartDate(selection.startDate);
                                    PeriodsetOfflineLocationEndDate(selection.endDate);
                                }}
                                ranges={[{ startDate: PeriodofflineLocationStartDate, endDate: PeriodofflineLocationEndDate, key: 'selection' }]}
                            />
                            <div>
                                {/* 선택된 모집 기간 출력 */}
                                <p>모집 기간: {PeriodofflineLocationStartDate.toLocaleDateString()} - {PeriodofflineLocationEndDate.toLocaleDateString()}</p>
                            </div>

                            {/* 모집 안내 입력란 */}
                            <div className='recruitmentInfo'>
                                <label htmlFor='recruitmentInfo'>모집 안내:</label>
                                <textarea
                                    id='recruitmentInfo'
                                    name='recruitmentInfo'
                                    rows='4'
                                    cols='50'
                                    placeholder='모집 안내를 입력해주세요.'
                                ></textarea>
                            </div>

                            {/* 참가료 입력 드롭다운 */}
                            <div className='programFee'>
                                <label htmlFor='programFee'>참가료:</label>
                                <select value={programFee} onChange={handleProgramFeeChange}>
                                    <option value="무료">무료</option>
                                    <option value="프로그램별 상이">프로그램별</option>
                                    {/* 다른 옵션 추가 가능 */}
                                </select>
                            </div>



                            <div className="subtitle">
                                {/* 서브 타이틀 내용 생략 */}
                            </div>

                            <div className="subtitle">
                                <div id="subtitle3">
                                    <div>이용약관 및 동의</div>
                                    <text>*은 필수 입력 사항입니다.</text>
                                </div>
                                <div className="agreement">
                                    <div id="agreement1">
                                        <div className="agreement_title">* 이용약관</div>
                                        <div className="agreement_content1">이용약관 내용</div>
                                        이용약관에 동의하시겠습니까?&nbsp;&nbsp;
                                        <input type="checkbox" className="checkbox" name="agreement" id="agreement1" />
                                        <label for="agreement1"></label>
                                    </div>
                                    <div id="agreement2">
                                        <div className="agreement_title">* 개인정보 수집 및 이용 동의</div>
                                        <div className="agreement_content2">이용약관 내용</div>
                                        개인정보 수집 및 이용 목적에 동의하시겠습니까?&nbsp;&nbsp;
                                        <input type="checkbox" className="checkbox" name="agreement" id="agreement1" />
                                        <label for="agreement1"></label>
                                    </div>
                                </div>
                            </div>

                            <div className='validation'>
                                <button type='validation'>확인</button>
                            </div>
                            <div className='modify'>
                                <button type='modify'>수정</button>
                            </div>
                            <div className='delete'>
                                <button type='delete'>삭제</button>
                            </div>

                            <div className='formGroup'>
                                <button type='submit'>신청하기</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClassForm;