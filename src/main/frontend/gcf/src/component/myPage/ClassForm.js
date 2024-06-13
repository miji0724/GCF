import React, { useState, useEffect } from 'react';
import './ClassForm.css';
import 'react-calendar/dist/Calendar.css';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import axios from 'axios'; // axios import

function VideoItem({ id, name, onAddSubItem, onDeleteSubItem, onAttachFile, onVideoInfoChange, isParent }) {
    const [text, setText] = useState('');

    const handleTextChange = (e) => {
        setText(e.target.value);
        onVideoInfoChange(id, e.target.value);
    };

    return (
        <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", width: "100%", height: "40px", marginTop: "10px" }}>
            {isParent && (
                <>
                    <p style={{ margin: "0 10px 0 0" }}>{name}</p>
                    <input type="text" value={text} onChange={handleTextChange} style={{ marginRight: "10px", width: "370px" }} />
                    <button type="button" onClick={onAddSubItem} style={{ marginRight: "10px", width: "30px", height: "30px", backgroundColor: "#EDEDED" }}>+</button>
                    <button type="button" onClick={() => onDeleteSubItem(id)} style={{ width: "30px", height: "30px", backgroundColor: "#FF8585" }}>-</button>
                </>
            )}
            {!isParent && (
                <>
                    <p style={{ margin: "0 5px 0 5px", width: "50px" }}>{name}</p>
                    <input type="text" value={text} onChange={handleTextChange} style={{ marginRight: "10px", width: "230px" }} />
                    <input type="file" onChange={(e) => onAttachFile(e, id)} style={{ display: 'none' }} id={`file-input-${id}`} />
                    <label htmlFor={`file-input-${id}`} style={{ marginRight: "10px", width: "70px", height: "30px", backgroundColor: "#EDEDED", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" }}>파일 선택</label>
                    <button type="button" onClick={() => onDeleteSubItem(id)} style={{ width: "30px", height: "30px", backgroundColor: "#FF8585" }}>-</button>
                </>
            )}
        </div>
    );
}

function ClassForm() {
    const [bannerFields, setBannerFields] = useState([{ subject: '', file: null }]);
    const [bannerFiles, setBannerFiles] = useState([null]); // Add this line
    const [selectedItem, setSelectedItem] = useState("");
    const [onlineEducation, setOnlineEducation] = useState(false);
    const [offlineEducation, setOfflineEducation] = useState(false);
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
    const [offlineProgramType, setOfflineProgramType] = useState("");
    const [programNames, setProgramNames] = useState([""]);
    const [CName, setCName] = useState('');
    const [applicationInfo, setApplicationInfo] = useState(''); // 추가

    const [teacherId, setTeacherId] = useState(''); // 추가

    const [certificationFields, setCertificationFields] = useState([{ certification: '' }]);
    const [certificationFiles, setCertificationFiles] = useState([]);

    const [teachingSubjectFields, setTeachingSubjectFields] = useState([{ subject: '' }]);
    const [teachingSubjectFiles, setTeachingSubjectFiles] = useState([]);

    const [videoInfos, setVideoInfos] = useState({});
    const [videoFiles, setVideoFiles] = useState({});
    const [videoItems, setVideoItems] = useState([]);
    const [parentCounter, setParentCounter] = useState(1);
    const [subCounters, setSubCounters] = useState({});

    const [offPrograms, setOffPrograms] = useState([]);
    const [onPrograms, setOnPrograms] = useState([]);

    const parseFieldArray = (data = '', fieldName) => {
        return data ? data.split(',').map(item => ({ [fieldName]: item })) : [{ [fieldName]: '' }];
    };

    // 오프라인 프로그램 데이터를 불러오는 함수
    const fetchOffPrograms = async () => {
        try {
            const response = await axios.get('/api/offProgram');
            setOffPrograms(response.data);
            if (response.data.length > 0 && offlineEducation) {
                const program = response.data[0]; // 첫 번째 프로그램 데이터로 채움
                fillOfflineProgramFields(program);
            }
        } catch (error) {
            console.error("오프라인 프로그램 데이터를 불러오는 중 오류가 발생했습니다.", error);
        }
    };

    // 온라인 프로그램 데이터를 불러오는 함수
    const fetchOnPrograms = async () => {
        try {
            const response = await axios.get('/api/onProgram');
            setOnPrograms(response.data);
            if (response.data.length > 0 && onlineEducation) {
                const program = response.data[0]; // 첫 번째 프로그램 데이터로 채움
                fillOnlineProgramFields(program);
            }
        } catch (error) {
            console.error("온라인 프로그램 데이터를 불러오는 중 오류가 발생했습니다.", error);
        }
    };

    const fetchUserData = async () => {
        try {
            const response = await axios.get('/member/myinfo', { withCredentials: true });
            setTeacherId(response.data.id);
        } catch (error) {
            console.error("사용자 데이터를 불러오는 중 오류가 발생했습니다.", error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(() => {
        if (offlineEducation) {
            fetchOffPrograms();
        }
        if (onlineEducation) {
            fetchOnPrograms();
        }
    }, [offlineEducation, onlineEducation]);

    useEffect(() => {
        handleAddVideoItem();
    }, []);

    const fillOfflineProgramFields = (program) => {
        setCName(program.programName);
        setProgramNames(program.programDetailName ? program.programDetailName.split(", ") : [""]);
        setCertificationFields(program.application_info ? parseFieldArray(program.application_info, 'certification') : [{ certification: '' }]);
        setApplicationInfo(program.application_info);
        PeriodsetOfflineLocationStartDate(new Date(program.applicationStartDate));
        PeriodsetOfflineLocationEndDate(new Date(program.applicationEndDate));
        setOfflineLocationStartDate(new Date(program.operatingStartDay));
        setOfflineLocationEndDate(new Date(program.operatingEndDay));
        setProgramFee(program.participationFee);
        setStartHour(program.startTime);
        setEndHour(program.endTime);
        setNumberOfApplicants(program.maxParticipants.toString());
        setSelectedDay(program.dayOfWeek);
        setSelectedLocation(program.placeName);
        setOfflineProgramType(program.offlineCategory);
    };

    const fillOnlineProgramFields = (program) => {
        setCName(program.programName);
        // 필요한 필드 채우기
    };

    const handleAddCertificationField = () => {
        const newCertificationFields = [...certificationFields, { certification: '' }];
        setCertificationFields(newCertificationFields);
        setCertificationFiles([...certificationFiles, null]);
    };

    const handleRemoveCertificationField = (index) => {
        const newCertificationFields = [...certificationFields];
        newCertificationFields.splice(index, 1);
        setCertificationFields(newCertificationFields);
        const newCertificationFiles = [...certificationFiles];
        newCertificationFiles.splice(index, 1);
        setCertificationFiles(newCertificationFiles);
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
        setTeachingSubjectFiles([...teachingSubjectFiles, null]);
    };

    const handleRemoveTeachingSubjectField = (index) => {
        const newTeachingSubjectFields = [...teachingSubjectFields];
        newTeachingSubjectFields.splice(index, 1);
        setTeachingSubjectFields(newTeachingSubjectFields);
        const newTeachingSubjectFiles = [...teachingSubjectFiles];
        newTeachingSubjectFiles.splice(index, 1);
        setTeachingSubjectFiles(newTeachingSubjectFiles);
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
        const newBannerFiles = [...bannerFiles];
        newBannerFiles[index] = file;
        setBannerFiles(newBannerFiles);
    };

    const handleAddBannerField = () => {
        const newBannerFiles = [...bannerFiles, null];
        setBannerFiles(newBannerFiles);
    };

    const handleRemoveBannerField = (index) => {
        const newBannerFiles = [...bannerFiles];
        newBannerFiles.splice(index, 1);
        setBannerFiles(newBannerFiles);
    };

    const handleAddVideoItem = () => {
        const newItemId = videoItems.length + 1;
        const newItem = {
            id: newItemId,
            name: `${newItemId}강`,
            subItems: [],
        };
        setVideoItems([...videoItems, newItem]);
        setParentCounter(newItemId + 1);
    };

    const handleAddSubItem = (parentId) => {
        const newSubItemId = (subCounters[parentId] || 0) + 1;
        const newSubItem = {
            id: `${parentId}-${newSubItemId}`,
            name: `${parentId}-${newSubItemId}`,
        };
        const updatedItems = videoItems.map(item => {
            if (item.id === parentId) {
                return {
                    ...item,
                    subItems: [...item.subItems, newSubItem],
                };
            }
            return item;
        });
        setVideoItems(updatedItems);
        setSubCounters({
            ...subCounters,
            [parentId]: newSubItemId,
        });
    };

    const handleDeleteSubItem = (id) => {
        const updatedItems = videoItems.map(item => {
            if (item.id === id) {
                const newSubItems = item.subItems.slice(0, -1);
                return {
                    ...item,
                    subItems: newSubItems,
                };
            }
            return item;
        });
        setVideoItems(updatedItems);
        const maxId = Math.max(...updatedItems.find(item => item.id === id).subItems.map(subItem => parseInt(subItem.id.split('-')[1])));
        setSubCounters({
            ...subCounters,
            [id]: maxId - 1,
        });
        if (subCounters[id] < 1) {
            setSubCounters({
                ...subCounters,
                [id]: 0,
            });
        }
    };

    const handleDeleteParentItem = (parentId) => {
        const updatedItems = videoItems.filter(item => item.id !== parentId);
        setVideoItems(updatedItems);
        setParentCounter(updatedItems.length + 1);
    };

    const handleAttachFile = (event, id) => {
        const file = event.target.files[0];
        setVideoFiles(prevFiles => ({
            ...prevFiles,
            [id]: file
        }));
    };

    const handleVideoInfoChangeItem = (id, value) => {
        setVideoInfos(prevInfos => ({
            ...prevInfos,
            [id]: value
        }));
    };

    const handleDropdownChange = (event) => {
        setSelectedItem(event.target.value);
    };

    const handleOnlineEducationChange = (event) => {
        if (event.target.checked) {
            setOfflineEducation(false); // 오프라인 체크 해제
        }
        setOnlineEducation(event.target.checked);
    };

    const handleOfflineEducationChange = (event) => {
        if (event.target.checked) {
            setOnlineEducation(false); // 온라인 체크 해제
        }
        setOfflineEducation(event.target.checked);
    };

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    };

    const handleProgramFeeChange = (event) => {
        setProgramFee(event.target.value);
    };

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

    const handleCNameChange = (e) => {
        setCName(e.target.value);
    };

    const handleNumberOfApplicantsChange = (event) => {
        const { value } = event.target;
        if (/^\d*$/.test(value) || value === "") {
            setNumberOfApplicants(value);
        }
    };

    const handleOfflineProgramTypeChange = (event) => {
        setOfflineProgramType(event.target.value);
    };

    const handleApplicationInfoChange = (event) => {
        setApplicationInfo(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let formData = {};

        if (onlineEducation) {
            const teacherInfo = new FormData();
            teacherInfo.append('attachment', teachingSubjectFiles[0]);
            teacherInfo.append('description', teachingSubjectFields[0]);

            formData = {
                'teacherId': teacherId,
                'programName': CName,
                'operatingStartDay': offlineLocationStartDate,
                'views': 0,
                'likesCount': 0,
                'category': "온라인",
                'programType': "온라인",
                'poster': null,
                'approvalState': "승인대기",
                'programInfos': [],
                'teacherInfos': [],
                'comments': [],
                'videos': [],
            }

            let id = 0;
            try {
                const response = await axios.post('/api/onProgram', formData);
                console.log(response.data);
                id = response.data.id;
            } catch (error) {
                console.error(error);
            }

            const programInfo = new FormData();
            programInfo.append("id", id);
            Array.from(certificationFields).forEach((data, index) => {
                programInfo.append('descriptions', data);
            });
            Array.from(certificationFiles).forEach((file, index) => {
                programInfo.append('files', file);
            });

            try {
                const response = await axios.post('/api/onProgram/info', programInfo, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log(response.data + " @@@@@@@@@@@@@@");
            } catch (error) {
                console.error(error);
            }

            const teacherInfoData = new FormData();
            teacherInfoData.append("id", id);
            Array.from(teachingSubjectFields).forEach((data, index) => {
                teacherInfoData.append('descriptions', data.subject);
            });
            Array.from(teachingSubjectFiles).forEach((file, index) => {
                teacherInfoData.append('files', file);
            });

            try {
                const response = await axios.post('/api/onProgram/onteacherinfo', teacherInfoData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log(response.data + " #######");
            } catch (error) {
                console.error(error);
            }

            const videoInfoData = new FormData();
            videoInfoData.append("id", id);
            Object.entries(videoInfos).forEach(([key, value]) => {
                videoInfoData.append('videoinfodetails', value);
            });
            Object.entries(videoFiles).forEach(([key, file]) => {
                videoInfoData.append('files', file);
            });

            try {
                const response = await axios.post('/api/onProgram/onvideo', videoInfoData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log(response.data + " $$$$$$$$");
                alert("온라인 프로그램이 성공적으로 등록되었습니다.");
            } catch (error) {
                console.error(error);
                alert("온라인 프로그램 등록 중 오류가 발생했습니다.");
            }

        } else if (offlineEducation) {
            formData.append('teacherId', teacherId);
            formData.append('programName', CName);
            formData.append('programDetailName', programNames.join(", "));
            formData.append('application_info', applicationInfo);
            formData.append('applicationStartDate', PeriodofflineLocationStartDate);
            formData.append('applicationEndDate', PeriodofflineLocationEndDate);
            formData.append('operatingStartDay', offlineLocationStartDate);
            formData.append('operatingEndDay', offlineLocationEndDate);
            formData.append('participationFee', programFee);
            formData.append('startTime', startHour);
            formData.append('endTime', endHour);
            formData.append('maxParticipants', parseInt(numberOfApplicants, 10));
            formData.append('currentParticipants', 0);
            formData.append('applicationState', "접수중");
            formData.append('approvalState', "승인대기");
            formData.append('dayOfWeek', selectedDay);
            formData.append('views', 0);
            formData.append('likesCount', 0);
            formData.append('offlineCategory', offlineProgramType);
            formData.append('placeName', selectedLocation);
            formData.append('programType', "오프라인");
            formData.append('poster', null);
            formData.append('teacherInfos', []);

            bannerFiles.forEach((file, index) => {
                if (file) {
                    formData.append(`bannerFiles[${index}]`, file);
                }
            });

            try {
                const response = await axios.post('/api/offProgram', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log(response.data);
                alert("오프라인 프로그램이 성공적으로 등록되었습니다.");
            } catch (error) {
                console.error(error);
                alert("오프라인 프로그램 등록 중 오류가 발생했습니다.");
            }
        }
    };

    return (
        <div className='All'>
            <div className="May">
                <div className='ClassFormContainer'>
                    <div className='ClassFContainer'>
                        <div className='ClassFState'>강의 등록 신청서</div>
                    </div>
                    <div className="whiteBox">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={offlineEducation}
                                        onChange={handleOfflineEducationChange}
                                    />
                                    오프라인 교육
                                </label>

                                <label>
                                    <input
                                        type="checkbox"
                                        checked={onlineEducation}
                                        onChange={handleOnlineEducationChange}
                                    />
                                    온라인 교육
                                </label>
                            </div>

                            {offlineEducation && (
                                <>
                                    <div className="ClassName">
                                        <label htmlFor="CName">프로그래명 이름:</label>
                                        <input
                                            type="text"
                                            id="CName"
                                            name="CName"
                                            placeholder="프로그래명 이름 입력"
                                            value={CName}
                                            onChange={handleCNameChange}
                                        />
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

                                    <div className='TeachInfoGroup'>
                                        <label htmlFor='teachingSubjects'>강사 소개:</label>
                                        {teachingSubjectFields.map((field, index) => (
                                            <div key={index} className="teachingSubjectField">
                                                <input
                                                    type='text'
                                                    value={field.subject} // 수정된 부분
                                                    onChange={(event) => handleTeachingSubjectChange(event, index)} // 수정된 부분
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
                                    </div>

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

                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <div style={{ marginBottom: "20px" }}>
                                            <h4>오프라인 프로그램 선택</h4>
                                            <select value={offlineProgramType} onChange={handleOfflineProgramTypeChange}>
                                                <option value="교육">교육</option>
                                                <option value="체험">체험</option>
                                            </select>
                                        </div>
                                        <div style={{ marginBottom: "20px" }}>
                                            <h4>오프라인 장소 선택</h4>
                                            <h7>오프라인 교육 체크시</h7>
                                            <select value={selectedLocation} onChange={handleLocationChange}>
                                                <option value="김포아트빌리지">김포아트빌리지</option>
                                                <option value="통진두레문화센터">통진두레문화센터</option>
                                                <option value="김포국제조각공원">김포국제조각공원</option>
                                                <option value="월곶생활문화센터">월곶생활문화센터</option>
                                                <option value="김포평화문화관">김포평화문화관</option>
                                                <option value="작은미술관 보구곶">작은미술관 보구곶</option>
                                                <option value="애기봉평화생태공원">애기봉평화생태공원</option>
                                            </select>
                                        </div>
                                    </div>
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
                                    <div className="persons">
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
                                            value={applicationInfo} // 수정된 부분
                                            onChange={handleApplicationInfoChange} // 수정된 부분
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
                                </>
                            )}

                            {onlineEducation && (
                                <>
                                    <div className="ClassName">
                                        <label htmlFor="CName">프로그래명 이름:</label>
                                        <input
                                            type="text"
                                            id="CName"
                                            name="CName"
                                            placeholder="프로그래명 이름 입력"
                                            value={CName}
                                            onChange={handleCNameChange}
                                        />
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

                                    <div className='TeachInfoGroup'>
                                        <label htmlFor='teachingSubjects'>강사 소개:</label>
                                        {teachingSubjectFields.map((field, index) => (
                                            <div key={index} className="teachingSubjectField">
                                                <input
                                                    type='text'
                                                    value={field.subject} // 수정된 부분
                                                    onChange={(event) => handleTeachingSubjectChange(event, index)} // 수정된 부분
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
                                    </div>

                                    <div className='BannerInfoGroup'>
                                        <label htmlFor='BannerSubjects'>교육 배너 포스터*:</label>
                                        {bannerFiles.map((file, index) => (
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

                                    <div className="OnlineLec">
                                        <h4>온라인 강의</h4>
                                        <div>
                                            {videoItems.map(item => (
                                                <div key={item.id} className="education-item-wrapper">
                                                    <button type="button" onClick={() => handleDeleteParentItem(item.id)} style={{ marginTop: "10px", marginRight: "10px", float: "right" }}>-</button>
                                                    <button type="button" onClick={handleAddVideoItem} style={{ marginTop: "10px", marginRight: "10px", float: "right" }}>+</button>

                                                    <VideoItem
                                                        id={item.id}
                                                        name={item.name}
                                                        onAddSubItem={() => handleAddSubItem(item.id)}
                                                        onDeleteSubItem={handleDeleteParentItem}
                                                        onAttachFile={handleAttachFile}
                                                        onVideoInfoChange={handleVideoInfoChangeItem}
                                                        isParent={true}
                                                    />
                                                    {item.subItems.map(subItem => (
                                                        <VideoItem
                                                            key={subItem.id}
                                                            id={subItem.id}
                                                            name={subItem.name}
                                                            onDeleteSubItem={handleDeleteSubItem}
                                                            onAddSubItem={() => handleAddSubItem(item.id)}
                                                            onAttachFile={handleAttachFile}
                                                            onVideoInfoChange={handleVideoInfoChangeItem}
                                                            isParent={false}
                                                        />
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </>
                            )}

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
                                        <label htmlFor="agreement1"></label>
                                    </div>
                                    <div id="agreement2">
                                        <div className="agreement_title">* 개인정보 수집 및 이용 동의</div>
                                        <div className="agreement_content2">이용약관 내용</div>
                                        개인정보 수집 및 이용 목적에 동의하시겠습니까?&nbsp;&nbsp;
                                        <input type="checkbox" className="checkbox" name="agreement" id="agreement2" />
                                        <label htmlFor="agreement2"></label>
                                    </div>
                                </div>
                            </div>

                            <div className='validation'>
                                <button type='button'>확인</button>
                            </div>
                            <div className='modify'>
                                <button type='button'>수정</button>
                            </div>
                            <div className='delete'>
                                <button type='button'>삭제</button>
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