import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideMenu from './ManageSideMenu';
import './ManageTeachAppDetail.css';
import { useLocation, useNavigate } from 'react-router-dom';

function ManageTeachAppDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const { teacher } = location.state;

    const [teacherInfo, setTeacherInfo] = useState({
        name: '',
        birth: '',
        phone_number: '',
        tel_number: '',
        email_id: '',
        email_domain: '',
        address: '',
        detail_address: '',
        affiliated_organization: '',
        sns_address: '',
        teachAppDetail_lec: [],
    });
    const [teacherCategories, setTeacherCategories] = useState([]);

    const [careerInputs, setCareerInputs] = useState([]);
    const [LicenseInputs, setLicenseInputs] = useState([]);
    const [teachAbleInputs, setTeachAbleInputs] = useState([]);
    const categoryMapping = {
        '문학': 'literature',
        '미술': 'art',
        '음악': 'music',
        '무용': 'dance',
        '영상': 'video',
        '연극': 'theater',
        '영화': 'movie',
        '국악': 'koreanMusic',
        '건축': 'architecture',
        '출판': 'publication',
        '만화': 'comic',
        '기타': 'etc'
    };

    useEffect(() => {
        if (teacher) {
            const {
                email,
                teacherCategory,
                career,
                careerStartYear,
                careerEndYear,
                licenseName,
                teachAbleCategory,
                ...rest
            } = teacher;

            const [id, domain] = email.split('@');

            setTeacherCategories(teacherCategory);
            setTeacherInfo({
                ...rest,
                birth: formatDate(teacher.birth),
                phone_number: teacher.phone_number || '',
                tel_number: teacher.tel_number || '',
                email_id: id || '',
                email_domain: domain || '',
                teachAppDetail_lec: teacherCategory,
            });

            setCareerInputs(career.split(',').map((value, index) => {
                const startDateParts = careerStartYear.split(',')[index].split('-');
                const endDateParts = careerEndYear.split(',')[index].split('-');
                return {
                    id: index,
                    value,
                    startYear: startDateParts[0] || '',
                    startMonth: startDateParts[1] || '',
                    startDay: startDateParts[2] || '',
                    endYear: endDateParts[0] || '',
                    endMonth: endDateParts[1] || '',
                    endDay: endDateParts[2] || '',
                };
            }));
            

            setLicenseInputs(licenseName.split(',').map((value, index) => ({
                id: index,
                value,
            })));

            setTeachAbleInputs(teachAbleCategory.split(',').map((value, index) => ({
                id: index,
                value,
            })));
        }
    }, [teacher]);

    const formatDate = (dateArray) => {
        if (Array.isArray(dateArray) && dateArray.length === 3) {
            const [year, month, day] = dateArray;
            return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        }
        return '';
    };

    const handleInputChange = (e, field, index = null) => {
        const value = e.target.value || ''; // Handle null or undefined
        setTeacherInfo((prev) => {
            if (index !== null) {
                const newArray = [...prev[field]];
                newArray[index] = value;
                return { ...prev, [field]: newArray };
            }
            return { ...prev, [field]: value };
        });
    };

    const handleTeachAppDetailChange = (event) => {
        const { value, checked } = event.target;
        setTeacherInfo((prev) => {
            if (checked) {
                return { ...prev, teachAppDetail_lec: [...prev.teachAppDetail_lec, value] };
            } else {
                return { ...prev, teachAppDetail_lec: prev.teachAppDetail_lec.filter((item) => item !== value) };
            }
        });
    };

    // 승인
    const sendApprovalRequest = () => {
        axios.put(`/manage/teacherApproval`, teacher.id, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                alert('회원 강사 신청을 승인하였습니다.');
                navigate(-1);
            })
            .catch(error => {
                console.error('There was a problem with your axios operation:', error);
                // 오류 처리 로직을 추가할 수 있습니다.
            });
    };

    // 미승인
    const sendNotApprovalRequest = () => {
        axios.put(`/manage/teacherNotApproval`, teacher.id, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                alert('회원 강사 신청을 미승인하였습니다.');
                navigate(-1);
            })
            .catch(error => {
                console.error('There was a problem with your axios operation:', error);
                // 오류 처리 로직을 추가할 수 있습니다.
            });
    };

    return (
        <div className='teachAppDetail_container'>
            <SideMenu />
            <div className='teachAppDetail'>
                <p>강사회원 상세정보</p>
                <a class='back_button' href='javascript:history.back()'>목록으로 돌아가기 &gt;</a>
                <div className='teachAppDetail_area'>
                    <div className='teachAppDetail_left'>
                        <ul>
                            <li>* 이름</li>
                            <li>* 생년월일</li>
                            <li>* 휴대폰 번호</li>
                            <li>전화번호</li>
                            <li>* 이메일</li>
                            <li>* 주소</li>
                            <li>상세주소</li>
                            <li>소속기관</li>
                            <li>SNS주소</li>
                            <li>* 강의분야</li>
                            <li>&nbsp;</li>
                            <li>* 주요이력</li>
                            <li>&nbsp;</li>
                            <li className='marginTop10'>&nbsp;</li>
                            <li className='marginTop10'>자격증</li>
                            <li>&nbsp;</li>
                            <li>&nbsp;</li>
                            <li className='marginTop10'>강의가능분야</li>
                            <li>&nbsp;</li>
                            <li>&nbsp;</li>
                        </ul>
                    </div>
                    <div className='teachAppDetail_right'>
                        <ul>
                            <li><input type='text' id='teachAppDetail_name' value={teacherInfo.name || ''} disabled /></li>
                            <li className='teachAppDetail_birth_container'>
                                <input type='date' id='teachAppDetail_birth_detail' value={teacherInfo.birth || ''} disabled />
                            </li>
                            <li><input type="text" id='teachAppDetail_phoneNum' maxLength="13" value={teacherInfo.phone_number || ''} disabled /></li>
                            <li><input type="text" id='teachAppDetail_telNum' maxLength="11" value={teacherInfo.tel_number || ''} disabled /></li>
                            <li>
                                <input type='text' id='teachAppDetail_emailId' value={teacherInfo.email_id || ''} disabled />
                                &nbsp;@&nbsp;
                                <input type='text' id='teachAppDetail_emailAddr' value={teacherInfo.email_domain || ''} disabled />
                            </li>
                            <li><input type='text' id='teachAppDetail_addr' value={teacherInfo.address || ''} disabled /></li>
                            <li><input type='text' id='teachAppDetail_addrD' value={teacherInfo.detail_address || ''} disabled /></li>
                            <li><input type='text' id='teachAppDetail_organizaion' value={teacherInfo.affiliatedOrganization || ''} disabled /></li>
                            <li><input type='text' id='teachAppDetail_sns' value={teacherInfo.snsAddress || ''} onChange={(e) => handleInputChange(e, 'sns_address')} disabled /></li>
                            <li>
                                <div className='teachApp_detail_category_area'>
                                    {Object.keys(categoryMapping).map((category, index) => (
                                        <label key={index} className="teachApp_detail_category_label">
                                            <input
                                                type="checkbox"
                                                name='teachAppDetail_lec'
                                                value={category}
                                                checked={teacherInfo.teachAppDetail_lec.includes(categoryMapping[category])}
                                                onChange={handleTeachAppDetailChange}
                                                disabled
                                            />
                                            {category}
                                        </label>
                                    ))}
                                </div>
                            </li>
                            <li>
                                <div className='mainCareer_area'>
                                    {careerInputs.map((input) => (
                                        <div key={input.id} className='mainCareer_flexArea'>
                                            <input
                                                type='text'
                                                className='mainCareer_detail'
                                                id={`teachAppDetail_mainCareer${input.id}_detail`}
                                                value={input.value || ''}
                                                onChange={(e) => handleInputChange(e, 'careerArray', input.id)}
                                                disabled
                                            />
                                            <input
                                                type='text'
                                                className='mainCareer_startDate'
                                                id={`teachAppDetail_mainCareer${input.id}_startDate`}
                                                value={`${input.startYear}-${String(input.startMonth).padStart(2, '0')}-${String(input.startDay).padStart(2, '0')}`}
                                                onChange={(e) => handleInputChange(e, 'careerStartYearArray', input.id)}
                                                disabled
                                            />
                                            ~
                                            <input
                                                type='text'
                                                className='mainCareer_endDate'
                                                id={`teachAppDetail_mainCareer${input.id}_endDate`}
                                                value={`${input.endYear}-${String(input.endMonth).padStart(2, '0')}-${String(input.endDay).padStart(2, '0')}`}
                                                onChange={(e) => handleInputChange(e, 'careerEndYearArray', input.id)}
                                                disabled
                                            />
                                        </div>
                                    ))}
                                </div>

                            </li>
                            <li>
                                <div className='License_area'>
                                    {LicenseInputs.map((input) => (
                                        <div key={input.id} className='License_flexArea'>
                                            <input
                                                type='text'
                                                className='License'
                                                id={`teachAppDetail_License${input.id}`}
                                                value={input.value || ''}
                                                onChange={(e) => handleInputChange(e, 'licenseNameArray', input.id)}
                                                disabled
                                            />
                                        </div>
                                    ))}
                                </div>
                            </li>
                            <li>
                                <div className='teachAble_area'>
                                    {teachAbleInputs.map((input) => (
                                        <div key={input.id} className='teachAble_flexArea'>
                                            <input
                                                type='text'
                                                className='teachAble'
                                                id={`teachAppDetail_teachAble${input.id}`}
                                                value={input.value || ''}
                                                onChange={(e) => handleInputChange(e, 'teachAbleCategoryArray', input.id)}
                                                disabled
                                            />
                                        </div>
                                    ))}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='teachAppDetail_btnArea'>
                    <button onClick={sendApprovalRequest} className='teachAppDetail_approval'>승인</button>
                    <button onClick={sendNotApprovalRequest} className='teachAppDetail_notApproval'>미승인</button>
                </div>
            </div>
        </div>
    );
}

export default ManageTeachAppDetail;