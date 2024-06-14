import React, { useState, useEffect } from "react";
import './ClassForm.css';
import 'react-calendar/dist/Calendar.css';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import 'react-time-picker/dist/TimePicker.css';
import axios from 'axios'; // axios import

function ClassForm() {

    const [bannerFile, setBannerFile] = useState(null);
    const [id, setId] = useState(1);
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
    const [programName, setProgramName] = useState([""]);
    const [CName, setCName] = useState('');
    const [applicationInfo, setApplicationInfo] = useState(''); // 추가

    const [teacherId, setTeacherId] = useState(''); // 추가

    const [certificationFields, setCertificationFields] = useState([{ certification: '' }]);
    const [certificationFiles, setCertificationFiles] = useState([]);

    const [teachingSubjectFields, setTeachingSubjectFields] = useState([{ subject: '' }]);
    const [teachingSubjectFiles, setTeachingSubjectFiles] = useState([]);

    const [category, setCategory] = useState("");

    const [videoInfoFields, setVideoInfoFields] = useState([
        {
            lectureNumber: '1',
            videoInfoDetail: '',
            subFields: [
                { subLectureNumber: '1', videoInfoDetail: '', videoFile: null }
            ]
        }
    ]);


    // const [offPrograms, setOffPrograms] = useState([]);
    // const [onPrograms, setOnPrograms] = useState([]);

    const [showAlert, setShowAlert] = useState(false);

    const parseFieldArray = (data = '', fieldName) => {
        return data ? data.split(',').map(item => ({ [fieldName]: item })) : [{ [fieldName]: '' }];
    };

    // // 오프라인 프로그램 데이터를 불러오는 함수
    // const fetchOffPrograms = async () => {
    //     try {
    //         const response = await axios.get('/api/offProgram');
    //         setOffPrograms(response.data);
    //         if (response.data.length > 0 && offlineEducation) {
    //             const program = response.data[0]; // 첫 번째 프로그램 데이터로 채움
    //             fillOfflineProgramFields(program);
    //         }
    //     } catch (error) {
    //         console.error("오프라인 프로그램 데이터를 불러오는 중 오류가 발생했습니다.", error);
    //     }
    // };

    // // 온라인 프로그램 데이터를 불러오는 함수
    // const fetchOnPrograms = async () => {
    //     try {
    //         const response = await axios.get('/api/onProgram');
    //         setOnPrograms(response.data);
    //         if (response.data.length > 0 && onlineEducation) {
    //             const program = response.data[0]; // 첫 번째 프로그램 데이터로 채움
    //             fillOnlineProgramFields(program);
    //         }
    //     } catch (error) {
    //         console.error("온라인 프로그램 데이터를 불러오는 중 오류가 발생했습니다.", error);
    //     }
    // };

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

    // useEffect(() => {
    //     if (offlineEducation) {
    //         fetchOffPrograms();
    //     }
    //     if (onlineEducation) {
    //         fetchOnPrograms();
    //     }
    // }, [offlineEducation, onlineEducation]);

    const fillOfflineProgramFields = (program) => {
        setCName(program.programName);
        setProgramName(program.programDetailName ? program.programDetailName.split(", ") : [""]);
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

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleTeachingSubjectFileChange = (event, index) => {
        const files = event.target.files;
        const newTeachingSubjectFiles = [...teachingSubjectFiles];
        newTeachingSubjectFiles[index] = files[0];
        setTeachingSubjectFiles(newTeachingSubjectFiles);
    };

    const handleBannerFileChange = (event) => {
        setBannerFile(event.target.files[0]);
    };

    const handleAddBannerField = () => {
        const newBannerFiles = [...bannerFile, null];
        setBannerFile(newBannerFiles);
    };

    const handleRemoveBannerField = (index) => {
        const newBannerFile = [...bannerFile];
        newBannerFile.splice(index, 1);
        setBannerFile(newBannerFile);
    };

    const handleVideoInfoChange = (event, index) => {
        const newVideoInfoFields = [...videoInfoFields];
        newVideoInfoFields[index].videoInfoDetail = event.target.value;
        setVideoInfoFields(newVideoInfoFields);
    };

    const handleSubVideoInfoChange = (event, index, subIndex) => {
        const newVideoInfoFields = [...videoInfoFields];
        newVideoInfoFields[index].subFields[subIndex].videoInfoDetail = event.target.value;
        setVideoInfoFields(newVideoInfoFields);
    };

    const handleVideoFileChange = (event, index, subIndex) => {
        const newVideoInfoFields = [...videoInfoFields];
        newVideoInfoFields[index].subFields[subIndex].videoFile = event.target.files[0];
        setVideoInfoFields(newVideoInfoFields);
    };

    const handleAddVideoField = () => {
        setVideoInfoFields([
            ...videoInfoFields,
            {
                lectureNumber: String(videoInfoFields.length + 1),
                videoInfoDetail: '',
                subFields: [
                    { subLectureNumber: '1', videoInfoDetail: '', videoFile: null }
                ]
            }
        ]);
    };

    const handleRemoveVideoField = (index) => {
        const newVideoInfoFields = [...videoInfoFields];
        newVideoInfoFields.splice(index, 1);
        // 삭제된 강 뒤에 있는 강들의 순서를 조정
        for (let i = index; i < newVideoInfoFields.length; i++) {
            newVideoInfoFields[i].lectureNumber = String(i + 1);
        }
        setVideoInfoFields(newVideoInfoFields);
    };
    const handleAddSubVideoField = (index) => {
        const newVideoInfoFields = [...videoInfoFields];
        newVideoInfoFields[index].subFields.push({
            subLectureNumber: String(newVideoInfoFields[index].subFields.length + 1),
            videoInfoDetail: '',
            videoFile: null
        });
        setVideoInfoFields(newVideoInfoFields);
    };

    const handleRemoveSubVideoField = (index, subIndex) => {
        const newVideoInfoFields = [...videoInfoFields];
        newVideoInfoFields[index].subFields.splice(subIndex, 1);
        // 삭제된 하위 강 뒤에 있는 하위 강들의 순서를 조정
        for (let i = subIndex; i < newVideoInfoFields[index].subFields.length; i++) {
            newVideoInfoFields[index].subFields[i].subLectureNumber = String(i + 1);
        }
        setVideoInfoFields(newVideoInfoFields);
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
        setProgramName([...programName, ""]);
    };

    const removeProgramName = (index) => {
        const newProgramName = [...programName];
        newProgramName.splice(index, 1);
        setProgramName(newProgramName);
    };

    const handleProgramNameChange = (value) => {
        setProgramName(value);
    };

    const handleSelectedDayChange = (e) => {
        setSelectedDay(e.target.value);
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

    const handleOfflineProgramTypeChange = (e) => {
        setOfflineProgramType(e.target.value);
    };

    const handleApplicationInfoChange = (event) => {
        setApplicationInfo(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let formData = {};
        let posterId = 0;
        let id = 0;

        if (onlineEducation) {
            const posterData = new FormData();
            posterData.append('poster', bannerFile);

            const programInfo = new FormData();

            Array.from(certificationFields).forEach((data, index) => {
                programInfo.append('descriptions', data.certification);
            });
            Array.from(certificationFiles).forEach((file, index) => {
                programInfo.append('files', file);
                console.log(file);
            });

            const teacherInfo = new FormData();

            Array.from(teachingSubjectFields).forEach((data, index) => {
                teacherInfo.append('descriptions', data.subject);
            });
            Array.from(teachingSubjectFiles).forEach((file, index) => {
                teacherInfo.append('files', file);
            });

            const videoInfoData = new FormData();

            videoInfoFields.forEach((data, index) => {
                videoInfoData.append('videoinfodetails', data.videoInfoDetail);
                videoInfoData.append('videoinfoindex', data.lectureNumber);

                // 만약 파일이 없다면 빈 Blob 추가
                videoInfoData.append('files', new Blob());

                // 각 하위 항목에 대해 FormData에 추가
                data.subFields.forEach(subField => {
                    videoInfoData.append('videoinfodetails', subField.videoInfoDetail);
                    videoInfoData.append('videoinfoindex', `${data.lectureNumber}-${subField.subLectureNumber}`);

                    // 만약 파일이 없다면 빈 Blob 추가
                    videoInfoData.append('files', subField.videoFile || new Blob());
                });
            });



            if (!CName ||
                !bannerFile ||
                !programInfo ||
                !teacherInfo ||
            !category) {

                setShowAlert(true);
                return;
            } else {
                setShowAlert(false);

                try {
                    console.log(teacherId);
                    const response = await axios.post('/api/onProgram/poster', posterData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    console.log(response.data);
                    posterId = response.data.id;
                    console.log(posterId);
                } catch (error) {
                    console.error(error);
                }

                formData = {
                    'teacher': {},
                    'teacherId': teacherId,
                    'programName': CName,
                    'operatingStartDay': '',
                    'views': 0,
                    'likesCount': 0,
                    'category': category,
                    'programType': "온라인",
                    'poster': bannerFile,
                    'posterId': posterId,
                    'approvalState': "승인대기",
                    'programInfos': [],
                    'teacherInfos': [],
                    'comments': [],
                    'videos': [],
                }

                try {

                    for (const [key, value] of Object.entries(formData)) {
                        console.log(`${key}: ${value}`);
                    }

                    console.log(formData.teacherId);
                    console.log(posterId);

                    const response = await axios.post('/api/onProgram', formData, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    console.log(response.data);
                    id = response.data.id;
                } catch (error) {
                    console.error(error);
                }

                programInfo.append("id", id);
                teacherInfo.append("id", id);
                videoInfoData.append("id", id);

                try {
                    const response = await axios.post('/api/onProgram/onprograminfo', programInfo, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    console.log(response.data + " @@@@@@@@@@@@@@");
                } catch (error) {
                    console.error(error);
                }

                try {
                    const response = await axios.post('/api/onProgram/onteacherinfo', teacherInfo, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    console.log(response.data + " #######");
                } catch (error) {
                    console.error(error);
                }

                // FormData 객체의 내용 출력
                for (let pair of videoInfoData.entries()) {
                    console.log(`${pair[0]}: ${pair[1]}`);
                }

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
            }
        } else if (offlineEducation) {
            const posterData = new FormData();
            posterData.append('poster', bannerFile);

            const programInfo = new FormData();
            Array.from(certificationFields).forEach((data, index) => {
                programInfo.append('descriptions', data.certification);
            });
            Array.from(certificationFiles).forEach((file, index) => {
                programInfo.append('files', file);
                console.log(file);
            });

            const teacherInfo = new FormData();
            Array.from(teachingSubjectFields).forEach((data, index) => {
                teacherInfo.append('descriptions', data.subject);
            });
            Array.from(teachingSubjectFiles).forEach((file, index) => {
                teacherInfo.append('files', file);
            });


            if (!CName ||
                !programName ||
                !applicationInfo ||
                !selectedLocation ||
                !numberOfApplicants ||
                !programFee ||
                !selectedLocation ||
                !programInfo ||
                !teacherInfo
            ) {
                setShowAlert(true);
                return;
            } else {
                setShowAlert(false);

                try {
                    console.log(teacherId);
                    const response = await axios.post('/api/offProgram/poster', posterData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    console.log(response.data);
                    posterId = response.data.id;
                    console.log(posterId);
                } catch (error) {
                    console.error(error);
                }

                formData = {
                    'teacher': {},
                    'teacherId': teacherId,
                    'programName': CName,
                    'programDetailName': programName,
                    'application_info': applicationInfo,
                    'applicationStartDate': PeriodofflineLocationStartDate,
                    'applicationEndDate': PeriodofflineLocationEndDate,
                    'operatingStartDay': offlineLocationStartDate,
                    'operatingEndDay': offlineLocationEndDate,
                    'participationFee': programFee,
                    'startTime': startHour,
                    'endTime': endHour,
                    'maxParticipants': parseInt(numberOfApplicants, 10),
                    'currentParticipants': 0,
                    'applicationState': "접수중",
                    'approvalState': "승인대기",
                    'dayOfWeek': selectedDay,
                    'views': 0,
                    'likesCount': 0,
                    'category': offlineProgramType,
                    'placeName': selectedLocation,
                    'programType': "오프라인",
                    'poster': bannerFile,
                    'posterId': posterId,
                    'programInfos': [],
                    'teacherInfos': [],
                }

                try {

                    for (const [key, value] of Object.entries(formData)) {
                        console.log(`${key}: ${value}`);
                    }
                    console.log(teacherId);

                    const response = await axios.post('/api/offProgram', formData, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    id = response.data.id;
                    console.log(response.data);
                    console.log(id);
                } catch (error) {
                    console.error(error);
                }

                programInfo.append("id", id);
                teacherInfo.append("id", id);

                try {
                    console.log(id);

                    for (const [key, value] of Object.entries(programInfo)) {
                        console.log(`${key}: ${value}`);
                    }

                    const response = await axios.post('/api/offProgram/offprograminfo', programInfo, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    console.log(response.data + " @@@@@@@@@@@@@@");
                } catch (error) {
                    console.error(error);
                }

                try {
                    const response = await axios.post('/api/offProgram/offteacherinfo', teacherInfo, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    console.log(response.data + " #######");
                    alert("오프라인 프로그램이 성공적으로 등록되었습니다.");
                } catch (error) {
                    console.error(error);
                    alert("오프라인 프로그램 등록 중 오류가 발생했습니다.");
                }


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
                                        <label id='classForm_cName' htmlFor="CName">프로그램명 이름:</label>
                                        <input
                                            type="text"
                                            id="CName"
                                            name="CName"
                                            placeholder="프로그램명 이름 입력"
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
                                                    id='teachInfo_textBox'
                                                    onChange={(event) => handleCertificationChange(event, index)}
                                                />
                                                <input
                                                    type="file"
                                                    id='teachInfo_fileBox'
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
                                                    id='teachInfo_textBox'
                                                    onChange={(event) => handleTeachingSubjectChange(event, index)} // 수정된 부분
                                                />
                                                <input
                                                    type="file"
                                                    id='teachInfo_fileBox'
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
                                        <input
                                            type="file"
                                            onChange={handleBannerFileChange}
                                        />
                                    </div>

                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <div style={{ marginBottom: "20px" }}>
                                            <h4>오프라인 프로그램 선택</h4>
                                            <select value={offlineProgramType} onChange={handleOfflineProgramTypeChange}>
                                                <option value="">선택</option>
                                                <option value="교육">교육</option>
                                                <option value="체험">체험</option>
                                            </select>
                                        </div>
                                        <div style={{ marginBottom: "20px" }}>
                                            <h4>오프라인 장소 선택</h4>
                                            <select value={selectedLocation} onChange={handleLocationChange}>
                                                <option value="">장소선택</option>
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
                                        <select value={selectedDay} onChange={handleSelectedDayChange}>
                                            <option value="">선택</option>
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
                                        <div>
                                            <input
                                                type="text"
                                                value={programName}
                                                placeholder="프로그램명"
                                                onChange={(e) => handleProgramNameChange(e.target.value)}
                                            />
                                        </div>
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
                                            <option value="">비용선택</option>
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
                                        <label id='classForm_cName' htmlFor="CName">프로그램명 이름:</label>
                                        <input
                                            type="text"
                                            id="CName"
                                            name="CName"
                                            placeholder="프로그램명 이름 입력"
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
                                                    id='teachInfo_textBox'
                                                    onChange={(event) => handleCertificationChange(event, index)}
                                                />
                                                <input
                                                    type="file"
                                                    id='teachInfo_fileBox'
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
                                                    id='teachInfo_textBox'
                                                    onChange={(event) => handleTeachingSubjectChange(event, index)} // 수정된 부분
                                                />
                                                <input
                                                    type="file"
                                                    id='teachInfo_fileBox'
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
                                        <input
                                            type="file"
                                            onChange={handleBannerFileChange}
                                        />
                                    </div>

                                    <div className="OnlineLec">
                                        <select id='lecOnDetail_lecField' value={category} onChange={handleCategoryChange}>
                                        <option value=''>선택</option>
                                            <option value='미술'>미술</option>
                                            <option value='과학'>과학</option>
                                            <option value='음악'>음악</option>
                                            <option value='디자인'>디자인</option>
                                            <option value='교육'>교육</option>
                                            <option value='기타'>기타</option>
                                        </select>
                                        <h4>온라인 강의</h4>
                                        <div>
                                            {videoInfoFields.map((field, index) => (
                                                <div key={index} className="videoInfoField">
                                                    <div className="videoHField">
                                                        <p className="video_indexField">{field.lectureNumber}강</p>
                                                        <input
                                                            type='text'
                                                            id='video_detailArea'
                                                            placeholder="강의 제목"
                                                            value={field.videoInfoDetail}
                                                            onChange={(event) => handleVideoInfoChange(event, index)}
                                                        />
                                                        <button type='button' id="video_removeButton" onClick={() => handleRemoveVideoField(index)}>-</button>
                                                    </div>
                                                    {field.subFields.map((subField, subIndex) => (
                                                        <div key={subIndex} style={{}} className="subVideoInfoField">
                                                            <p className="video_indexField">{field.lectureNumber}-{subField.subLectureNumber}</p>
                                                            <input
                                                                type='text'
                                                                id='video_subDetailArea'
                                                                placeholder="하위 강의 제목"
                                                                value={subField.videoInfoDetail}
                                                                onChange={(event) => handleSubVideoInfoChange(event, index, subIndex)}
                                                            />
                                                            <input
                                                                type="file"
                                                                id='video_attachArea'
                                                                onChange={(event) => handleVideoFileChange(event, index, subIndex)}
                                                            />
                                                            <button type='button' id="video_plusButton" onClick={() => handleAddSubVideoField(index)}>+</button>
                                                            <button type='button' id="video_removeButton" onClick={() => handleRemoveSubVideoField(index, subIndex)}>-</button>
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                            <div className="video_addButton">
                                                <button type='button' id="video_bigPlusButton" onClick={handleAddVideoField}>+ 비디오 추가</button>
                                            </div>
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
                            {showAlert && <p style={{ color: 'red' }}>모든 필드를 입력해주세요.</p>}
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