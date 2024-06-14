import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideMenu from './ManageSideMenu';
import './ManageTeachDetail.css';
import { useLocation, useNavigate } from 'react-router-dom';

function ManageTeachDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const { teacher } = location.state;

    console.log(teacher);

    const [teacherInfo, setTeacherInfo] = useState({
        name: '',
        birth: '',
        phone_number: '',
        tel_number: '',
        email_id: '',
        email_domain: '',
        address: '',
        detail_address: '',
        affiliatedOrganization: '',
        snsAddress: '',
        teacherCategory: [],
    });

    const [phoneNumber, setPhoneNumber] = useState('');
    const [teacherCategories, setTeacherCategories] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [careerInputs, setCareerInputs] = useState([]);
    const [licenseInputs, setLicenseInputs] = useState([]);
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
                phone_number: teacher.phone_number,
                tel_number: teacher.tel_number,
                email_id: id,
                email_domain: domain,
                teacherCategory: teacherCategory,
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

    const formatDate = (dateArray) => {
        if (Array.isArray(dateArray) && dateArray.length === 3) {
            const [year, month, day] = dateArray;
            return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        }
        return '';
    };

    const handleInputChange = (e, field) => {
        const value = e.target.value;
        setTeacherInfo((prev) => ({ ...prev, [field]: value }));
    };

    const handleArrayInputChange = (e, arrayName, index, key) => {
        const value = e.target.value;
        if (arrayName === 'careerInputs') {
            setCareerInputs((prev) => {
                const newArray = [...prev];
                newArray[index] = { ...newArray[index], [key]: value };
                return newArray;
            });
        } else if (arrayName === 'licenseInputs') {
            setLicenseInputs((prev) => {
                const newArray = [...prev];
                newArray[index] = { ...newArray[index], [key]: value };
                return newArray;
            });
        } else if (arrayName === 'teachAbleInputs') {
            setTeachAbleInputs((prev) => {
                const newArray = [...prev];
                newArray[index] = { ...newArray[index], [key]: value };
                return newArray;
            });
        }
    };


    const handleTeachDetailChange = (event) => {
        const { value, checked } = event.target;
        setTeacherInfo((prev) => {
            if (checked) {
                return { ...prev, teachAppDetail_lec: [...prev.teachAppDetail_lec, value] };
            } else {
                return { ...prev, teachAppDetail_lec: prev.teachAppDetail_lec.filter((item) => item !== value) };
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

    const sendConfirmTeacherInfo = () => {
        const { email_id, email_domain, ...rest } = teacherInfo;

        const updatedTeacherInfo = {
            ...rest,
            name: teacherInfo.name,
            birth: teacherInfo.birth,
            phone_number: teacherInfo.phone_number,
            tel_number: teacherInfo.tel_number,
            address: teacherInfo.address,
            detail_address: teacherInfo.detail_address,
            affiliatedOrganization: teacherInfo.affiliatedOrganization,
            snsAddress: teacherInfo.snsAddress,
            teacherCategory: teacherInfo.teacherCategory,
            career: careerInputs.map(input => input.value).join(','),
            careerStartYear: careerInputs.map(input => input.startYear).join(','),
            careerEndYear: careerInputs.map(input => input.endYear).join(','),
            licenseName: licenseInputs.map(input => input.value).join(','),
            teachAbleCategory: teachAbleInputs.map(input => input.value).join(','),
            email: `${email_id}@${email_domain}`
        };

        axios.put('/manage/confirmTeacherInfo', updatedTeacherInfo, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                alert('강사 정보를 성공적으로 수정하였습니다.');
                console.log(updatedTeacherInfo);
                navigate(-1);
            })
            .catch(error => {
                console.error('There was a problem with your axios operation:', error);
                console.log(updatedTeacherInfo);
            });
    };

    const deleteTeacherInfo = () => {
        axios.delete(`/manage/deleteTeacherInfo/${teacherInfo.id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                alert('해당 강사를 성공적으로 해임하였습니다.');
                navigate(-1);
            })
            .catch(error => {
                console.error('There was a problem with your axios operation:', error);
            });
    };

    return (
        <div className='teachDetail_container'>
            <SideMenu />
            <div className='teachDetail'>
                <p>강사회원 상세정보</p>
                <a class='back_button' href='javascript:history.back()'>목록으로 돌아가기 &gt;</a>
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
                    <div className='teachDetail_right'>
                        <ul>
                            <li>
                                <input
                                    type='text'
                                    name='name'
                                    value={teacherInfo.name}
                                    onChange={(e) => handleInputChange(e, 'name')}
                                    disabled={!isEditing}
                                />
                            </li>
                            <li>
                                <input
                                    type='date'
                                    name='birth'
                                    value={teacherInfo.birth}
                                    onChange={(e) => handleInputChange(e, 'birth')}
                                    disabled={!isEditing}
                                />
                            </li>
                            <li>
                                <input
                                    type='text'
                                    name='phone_number'
                                    value={teacherInfo.phone_number}
                                    onChange={(e) => handleInputChange(e, 'phone_number')}
                                    disabled={!isEditing}
                                />
                            </li>
                            <li>
                                <input
                                    type='text'
                                    name='tel_number'
                                    value={teacherInfo.tel_number}
                                    onChange={(e) => handleInputChange(e, 'tel_number')}
                                    disabled={!isEditing}
                                />
                            </li>
                            <li>
                                <input
                                    type='text'
                                    name='email_id'
                                    value={teacherInfo.email_id}
                                    onChange={(e) => handleInputChange(e, 'email_id')}
                                    disabled={!isEditing}
                                />@
                                <input
                                    type='text'
                                    name='email_domain'
                                    value={teacherInfo.email_domain}
                                    onChange={(e) => handleInputChange(e, 'email_domain')}
                                    disabled={!isEditing}
                                />
                            </li>
                            <li>
                                <input
                                    type='text'
                                    name='address'
                                    id='teachDetail_addr'
                                    value={teacherInfo.address}
                                    onChange={(e) => handleInputChange(e, 'address')}
                                    disabled={!isEditing}
                                />
                            </li>
                            <li>
                                <input
                                    type='text'
                                    name='detail_address'
                                    id='teachDetail_addrD'
                                    value={teacherInfo.detail_address}
                                    onChange={(e) => handleInputChange(e, 'detail_address')}
                                    disabled={!isEditing}
                                />
                            </li>
                            <li>
                                <input
                                    type='text'
                                    name='affiliatedOrganization'
                                    value={teacherInfo.affiliatedOrganization}
                                    onChange={(e) => handleInputChange(e, 'affiliatedOrganization')}
                                    disabled={!isEditing}
                                />
                            </li>
                            <li>
                                <input
                                    type='text'
                                    name='snsAddress'
                                    value={teacherInfo.snsAddress}
                                    onChange={(e) => handleInputChange(e, 'snsAddress')}
                                    disabled={!isEditing}
                                />
                            </li>
                            <li>
                                <div className='teach_detail_category_area'>
                                    {Object.keys(categoryMapping).map((category, index) => (
                                        <label key={index} className="teach_detail_category_label">
                                            <input
                                                type="checkbox"
                                                name='teacherCategory'
                                                value={category}
                                                checked={teacherInfo.teacherCategory.includes(categoryMapping[category])}
                                                onChange={handleTeachDetailChange}
                                                disabled
                                            />
                                            {category}
                                        </label>
                                    ))}
                                </div>
                            </li>
                            <li>
                                <div className='mainCareer_buttonAlign'>
                                    <div className='mainCareer_area'>
                                        {careerInputs.map((input, index) => (
                                            <div key={index} className='mainCareer_flexArea'>
                                                <input
                                                    type='text'
                                                    className='mainCareer_detail'
                                                    name={`career_${index}`}
                                                    value={input.value}
                                                    onChange={(e) => handleArrayInputChange(e, 'careerInputs', index, 'value')}
                                                    placeholder='주요 이력'
                                                    disabled={!isEditing}
                                                />
                                                <input
                                                    type='text'
                                                    className='mainCareer_startDate'
                                                    name={`careerStartYear_${index}`}
                                                    value={input.startYear}
                                                    onChange={(e) => handleArrayInputChange(e, 'careerInputs', index, 'startYear')}
                                                    placeholder='시작 연도'
                                                    disabled={!isEditing}
                                                />
                                                ~
                                                <input
                                                    type='text'
                                                    className='mainCareer_endDate'
                                                    name={`careerEndYear_${index}`}
                                                    value={input.endYear}
                                                    onChange={(e) => handleArrayInputChange(e, 'careerInputs', index, 'endYear')}
                                                    placeholder='종료 연도'
                                                    disabled={!isEditing}
                                                />
                                                <button onClick={() => handleRemoveCareerInput(input.id)} style={{ backgroundColor: "#FF8585" }} disabled={!isEditing}>-</button>
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={handleAddCareerInput} style={{ backgroundColor: "#8A95FF" }} disabled={!isEditing}>+</button>
                                </div>
                            </li>
                            <li>
                                <div className='License_buttonAlign'>
                                    <div className='License_area'>
                                        {licenseInputs.map((input, index) => (
                                            <div key={index} className='License_flexArea'>
                                                <input
                                                    type='text'
                                                    className='License'
                                                    name={`license_${index}`}
                                                    value={input.value}
                                                    onChange={(e) => handleArrayInputChange(e, 'licenseInputs', index, 'value')}
                                                    placeholder='자격증'
                                                    disabled={!isEditing}
                                                />
                                                <button onClick={() => handleRemoveLicenseInput(input.id)} style={{ backgroundColor: "#FF8585" }} disabled={!isEditing}>-</button>
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={handleAddLicenseInput} style={{ backgroundColor: "#8A95FF" }} disabled={!isEditing}>+</button>
                                </div>
                            </li>
                            <li>
                                <div className='teachAble_buttonAlign'>
                                    <div className='teachAble_area'>
                                        {teachAbleInputs.map((input, index) => (
                                            <div key={index} className='teachAble_flexArea'>
                                                <input
                                                    type='text'
                                                    className='teachAble'
                                                    name={`teachAble_${index}`}
                                                    value={input.value}
                                                    onChange={(e) => handleArrayInputChange(e, 'teachAbleInputs', index, 'value')}
                                                    placeholder='강의 가능 분야'
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
                    {isEditing ? (
                        <>
                            <button onClick={sendConfirmTeacherInfo} className='teachDetail_confirmBtn'>완료</button>
                            <button onClick={deleteTeacherInfo} className='teachDetail_deleteBtn'>해임</button>
                        </>
                    ) : (
                        <button onClick={() => setIsEditing(true)} className='teachDetail_confirmStartBtn'>수정</button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ManageTeachDetail;
