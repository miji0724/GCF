import React, { useState, useEffect } from 'react';
import SideMenu from './ManageSideMenu';
import './ManageTeachDetail.css';
import { useLocation } from 'react-router-dom';

function ManageTeachDetail() {
    const location = useLocation();
    const { teacher, from } = location.state;

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
        teachDetail_lec: [],
    });

    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedFileNames, setSelectedFileNames] = useState(['', '', '']);
    const [teacherCategories, setTeacherCategories] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    const [careerInputs, setCareerInputs] = useState([]);
    const [LicenseInputs, setLicenseInputs] = useState([]);
    const [teachAbleInputs, setTeachAbleInputs] = useState([]);

    const [accessFrom, setAccessFrom] = useState('');

    // TeachApp 클래스를 통한 접근 여부 확인
    const isTeachAppAccess = from === 'TeachApp';

    // Teacher 클래스를 통한 접근 여부 확인
    const isTeacherAccess = from === 'Teacher';

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
                phone_number: teacher.phone_number,
                tel_number: teacher.tel_number,
                email_id: id,
                email_domain: domain,
                teachDetail_lec: teacherCategory,
            });

            setCareerInputs(career.split(',').map((value, index) => ({
                id: index,
                value,
                startYear: careerStartYear.split(',')[index] || '',
                endYear: careerEndYear.split(',')[index] || '',
            })));

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

    useEffect(() => {
        if (from === 'TeachApp') {
            setAccessFrom('TeachApp');
        } else if (from === 'Teacher') {
            setAccessFrom('Teacher');
        }
    }, [from]);

    const formatDate = (dateArray) => {
        if (Array.isArray(dateArray) && dateArray.length === 3) {
            const [year, month, day] = dateArray;
            return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        }
        return '';
    };

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

    const handleAttachmentButtonClick = (index) => {
        document.getElementById(`teachDetail_License${index + 1}_attachment`).click();
    };

    const handleFileChange = (event, index) => {
        const file = event.target.files[0];
        const newSelectedFileNames = [...selectedFileNames];
        newSelectedFileNames[index] = file.name;
        setSelectedFileNames(newSelectedFileNames);
    };

    const handleInputChange = (e, field, index = null) => {
        const value = e.target.value;
        setTeacherInfo((prev) => {
            if (index !== null) {
                const newArray = [...prev[field]];
                newArray[index] = value;
                return { ...prev, [field]: newArray };
            }
            return { ...prev, [field]: value };
        });
    };

    const handleTeachDetailChange = (event) => {
        const { value, checked } = event.target;
        setTeacherInfo((prev) => {
            if (checked) {
                return { ...prev, teachDetail_lec: [...prev.teachDetail_lec, value] };
            } else {
                return { ...prev, teachDetail_lec: prev.teachDetail_lec.filter((item) => item !== value) };
            }
        });
    };

    const handleAddCareerInput = () => {
        setCareerInputs((prev) => [
            ...prev,
            { id: prev.length, value: '', startYear: '', endYear: '' },
        ]);
    };

    const handleRemoveCareerInput = (id) => {
        setCareerInputs((prev) => prev.filter((input) => input.id !== id));
    };

    const handleAddLicenseInput = () => {
        setLicenseInputs((prev) => [
            ...prev,
            { id: prev.length, value: '' },
        ]);
    };

    const handleRemoveLicenseInput = (id) => {
        setLicenseInputs((prev) => prev.filter((input) => input.id !== id));
    };

    const handleAddTeachAbleInput = () => {
        setTeachAbleInputs((prev) => [
            ...prev,
            { id: prev.length, value: '' },
        ]);
    };

    const handleRemoveTeachAbleInput = (id) => {
        setTeachAbleInputs((prev) => prev.filter((input) => input.id !== id));
    };

    console.log(from);

    return (
        <div className='teachDetail_container'>
            <SideMenu />
            <div className='teachDetail'>
                <p>강사회원 상세정보</p>
                <div className='teachDetail_area'>
                    <div className='teachDetail_left'>
                        <ul>
                            <li>* 이름</li>
                            <li>* 생년월일</li>
                            <li>* 휴대폰 번호</li>
                            <li>전화번호</li>
                            <li>* 이메일</li>
                            <li>* 주소</li>
                            <li>상세주소</li>
                            <li>소속기관</li>
                            <li>* 강의분야</li>
                            <li>SNS주소</li>
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
                    <div className='teachDetail_right'>
                        <ul>
                            <li> <input type='text' id='teachDetail_name' value={teacherInfo.name} onChange={(e) => handleInputChange(e, 'name')} disabled={!isEditing} /></li>
                            <li className='teachDetail_birth_container'>
                                <input type='date' id='teachDetail_birth_detail' value={teacherInfo.birth} onChange={(e) => handleInputChange(e, 'birth')} disabled={!isEditing} />
                            </li>
                            <li> <input type="text" id='teachDetail_phoneNum' maxLength="13" value={teacherInfo.phone_number} onChange={(e) => handlePhoneNumberChange(e)} disabled={!isEditing} /></li>
                            <li> <input type="text" id='teachDetail_telNum' maxLength="11" value={teacherInfo.tel_number} onChange={(e) => handleInputChange(e, 'tel_number')} disabled={!isEditing} /> </li>
                            <li>
                                <input type='text' id='teachDetail_emailId' value={teacherInfo.email_id} onChange={(e) => handleInputChange(e, 'email_id')} disabled={!isEditing} />
                                &nbsp;@&nbsp;
                                <input type='text' id='teachDetail_emailAddr' value={teacherInfo.email_domain} onChange={(e) => handleInputChange(e, 'email_domain')} disabled={!isEditing} />
                            </li>
                            <li> <input type='text' id='teachDetail_addr' value={teacherInfo.address} onChange={(e) => handleInputChange(e, 'address')} disabled={!isEditing} /></li>
                            <li> <input type='text' id='teachDetail_addrD' value={teacherInfo.detail_address} onChange={(e) => handleInputChange(e, 'detail_address')} disabled={!isEditing} /> </li>
                            <li> <input type='text' id='teachDetail_organizaion' value={teacherInfo.affiliated_organization} onChange={(e) => handleInputChange(e, 'affiliated_organization')} disabled={!isEditing} /> </li>
                            <li>
                                <div className='Detail_category'>
                                    {['문학', '미술', '음악', '무용', '영상', '연극', '영화', '국악', '건축', '출판', '만화', '기타'].map((category, index) => (
                                        <label key={index}>
                                            <input
                                                type="checkbox"
                                                name='teachDetail_lec'
                                                value={category}
                                                checked={teacherInfo.teachDetail_lec.includes(category)}
                                                onChange={handleTeachDetailChange}
                                                disabled={!isEditing}
                                            />
                                            {category}
                                        </label>
                                    ))}
                                </div>
                            </li>
                            <li> <input type='text' id='teachDetail_sns' value={teacherInfo.snsAddress} onChange={(e) => handleInputChange(e, 'sns_address')} disabled={!isEditing} /> </li>
                            <li>
                                <div className='mainCareer_buttonAlign'>
                                    <div className='mainCareer_area'>
                                        {careerInputs.map((input) => (
                                            <div key={input.id} className='mainCareer_flexArea'>
                                                <input
                                                    type='text'
                                                    className='mainCareer_detail'
                                                    id={`teachDetail_mainCareer${input.id}_detail`}
                                                    value={input.value}
                                                    onChange={(e) => handleInputChange(e, 'careerArray', input.id)}
                                                    disabled={!isEditing}
                                                />
                                                <input
                                                    type='number'
                                                    className='mainCareer_startDate'
                                                    id={`teachDetail_mainCareer${input.id}_startDate`}
                                                    value={input.startYear}
                                                    onChange={(e) => handleInputChange(e, 'careerStartYearArray', input.id)}
                                                    disabled={!isEditing}
                                                />
                                                ~
                                                <input
                                                    type='number'
                                                    className='mainCareer_endDate'
                                                    id={`teachDetail_mainCareer${input.id}_endDate`}
                                                    value={input.endYear}
                                                    onChange={(e) => handleInputChange(e, 'careerEndYearArray', input.id)}
                                                    disabled={!isEditing}
                                                />
                                                <button onClick={() => handleRemoveCareerInput(input.id)} style={{ backgroundColor: "#FF8585" }} disabled={!isEditing}>-</button>
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={handleAddCareerInput} style={{ backgroundColor: "#8A95FF" }} disabled={!isEditing}>+</button>
                                </div>
                            </li>
                            <li className='marginTop10'>
                                <div className='License_buttonAlign'>
                                    <div className='License_area'>
                                        {LicenseInputs.map((input) => (
                                            <div key={input.id} className='License_flexArea'>
                                                <input
                                                    type='text'
                                                    className='License'
                                                    id={`teachDetail_License${input.id}`}
                                                    value={input.value}
                                                    onChange={(e) => handleInputChange(e, 'licenseNameArray', input.id)}
                                                    disabled={!isEditing}
                                                />
                                                <button onClick={() => handleRemoveLicenseInput(input.id)} style={{ backgroundColor: "#FF8585" }} disabled={!isEditing}>-</button>
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={handleAddLicenseInput} style={{ backgroundColor: "#8A95FF" }} disabled={!isEditing}>+</button>
                                </div>
                            </li>
                            <li className='marginTop10'>
                                <div className='teachAble_buttonAlign'>
                                    <div className='teachAble_area'>
                                        {teachAbleInputs.map((input) => (
                                            <div key={input.id} className='teachAble_flexArea'>
                                                <input
                                                    type='text'
                                                    className='teachAble'
                                                    id={`teachDetail_teachAble${input.id}`}
                                                    value={input.value}
                                                    onChange={(e) => handleInputChange(e, 'teachAbleCategoryArray', input.id)}
                                                    disabled={!isEditing}
                                                />
                                                <button onClick={() => handleRemoveTeachAbleInput(input.id)} style={{ backgroundColor: "#FF8585" }} disabled={!isEditing}>-</button>
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={handleAddTeachAbleInput} style={{ backgroundColor: "#8A95FF" }} disabled={!isEditing}>+</button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='teachDetail_btnArea'>
                {accessFrom === 'TeachApp' ? (
                    <>
                        {/* TeachApp용 버튼 */}
                        {isEditing ? (
                            <>
                                <button onClick={() => setIsEditing(false)} className='teachDetail_confirmBtn'>완료</button>
                                <button className='teachDetail_deleteBtn'>삭제</button>
                            </>
                        ) : (
                            <button onClick={() => setIsEditing(true)} className='teachDetail_confirmStartBtn'>수정</button>
                        )}
                    </>
                ) : accessFrom === 'Teacher' ? (
                    <>
                        {/* Teacher용 버튼 */}
                        {/* Teacher에 맞는 버튼을 여기에 배치하세요 */}
                    </>
                ) : null}
            </div>
            </div>
        </div>
    );
}

export default ManageTeachDetail;
