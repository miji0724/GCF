import React, { useState, useEffect } from "react";
import axios from 'axios';
import './TeacherForm.css';

function TeacherForm() {
    const [birthDate, setBirthDate] = useState('');
    const [historyFields, setHistoryFields] = useState([{ event: '', startDate: '', endDate: '' }]);
    const [certificationFields, setCertificationFields] = useState([{ certification: '' }]);
    const [teachingSubjectFields, setTeachingSubjectFields] = useState([{ subject: '' }]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        mobileNumber: '',
        address: ''
    });

    useEffect(() => {
        const fetchBasicInfo = async () => {
            try {
                const response = await axios.get('http://localhost:8090/member/info', {
                    withCredentials: true, // 세션 쿠키를 포함
                });
                console.log('API response data:', response.data);

                const { name, email, phoneNumber, mobileNumber, address, detail_address, birth } = response.data;
                const updatedFormData = {
                    name,
                    email,
                    phoneNumber,
                    mobileNumber,
                    address1: address,
                    address2: detail_address,
                    affiliation: '',
                    snsEmail: ''
                };

                setFormData(updatedFormData);
                setBirthDate(birth);
                console.log('Updated form data:', updatedFormData);
                console.log('Updated birth date:', birth);
            } catch (error) {
                console.error('Failed to fetch basic info:', error);
                console.error('Error details:', error.response ? error.response.data : error.message);
                alert('기본 정보를 불러오는데 실패했습니다.');
            }
        };

        // 컴포넌트가 마운트될 때 사용자 정보를 가져옵니다.
        fetchBasicInfo();
    }, []);

    const handleBirthDateChange = (event) => {
        setBirthDate(event.target.value);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleHistoryChange = (event, index, field) => {
        const { value } = event.target;
        const newHistoryFields = [...historyFields];
        newHistoryFields[index][field] = value;
        setHistoryFields(newHistoryFields);
    };

    const handleAddHistoryField = () => {
        setHistoryFields([...historyFields, { event: '', startDate: '', endDate: '' }]);
    };

    const handleRemoveHistoryField = (index) => {
        const newHistoryFields = [...historyFields];
        newHistoryFields.splice(index, 1);
        setHistoryFields(newHistoryFields);
    };

    const handleCertificationChange = (event, index) => {
        const { value } = event.target;
        const newCertificationFields = [...certificationFields];
        newCertificationFields[index].certification = value;
        setCertificationFields(newCertificationFields);
    };

    const handleAddCertificationField = () => {
        setCertificationFields([...certificationFields, { certification: '' }]);
    };

    const handleRemoveCertificationField = (index) => {
        const newCertificationFields = [...certificationFields];
        newCertificationFields.splice(index, 1);
        setCertificationFields(newCertificationFields);
    };

    const handleTeachingSubjectChange = (event, index) => {
        const { value } = event.target;
        const newTeachingSubjectFields = [...teachingSubjectFields];
        newTeachingSubjectFields[index].subject = value;
        setTeachingSubjectFields(newTeachingSubjectFields);
    };

    const handleAddTeachingSubjectField = () => {
        setTeachingSubjectFields([...teachingSubjectFields, { subject: '' }]);
    };

    const handleRemoveTeachingSubjectField = (index) => {
        const newTeachingSubjectFields = [...teachingSubjectFields];
        newTeachingSubjectFields.splice(index, 1);
        setTeachingSubjectFields(newTeachingSubjectFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8090/lecture', {
                ...formData,
                birthDate,
                historyFields,
                certificationFields,
                teachingSubjectFields
            });
            console.log(response.data);
        } catch (error) {
            console.error('Failed to submit lecture info:', error);
        }
    };

    return (
        <div className='All'>
            <div className="Ma">
                <div className='ClassState'>강사 등록 신청서</div>
                <div className="ClassMenuContainer">
                    <div className="menu-item">승인</div>
                    <div className="menu-item">미승인</div>
                    <div className="menu-item">승인대기</div>
                </div>
                <div className='TeacherFormContainer'>
                    <h2>기본정보</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='validation'>
                            <button type='button'>확인</button>
                        </div>
                        <div className='modify'>
                            <button type='button'>수정</button>
                        </div>
                        <div className='delete'>
                            <button type='button'>삭제</button>
                        </div>

                        <div className='formName'>
                            <label htmlFor='name'>이름:</label>
                            <input
                                type='text'
                                id='name'
                                name='name'
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className='formEmail'>
                            <label htmlFor='email'>이메일:</label>
                            <input
                                type='email'
                                id='email'
                                name='email'
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className='formNumber'>
                            <label htmlFor='phoneNumber'>전화번호:</label>
                            <input
                                type='tel'
                                id='phoneNumber'
                                name='phoneNumber'
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                            />
                            <h4>※숫자만 입력 가능합니다.</h4>
                        </div>

                        <div className='formHNumber'>
                            <label htmlFor='mobileNumber'>휴대폰 번호:</label>
                            <input
                                type='tel'
                                id='mobileNumber'
                                name='mobileNumber'
                                value={formData.mobileNumber}
                                onChange={handleInputChange}
                            />
                            <h4>※숫자만 입력 가능합니다.</h4>
                        </div>

                        <div className='formDate'>
                            <label htmlFor='birthDate'>생년월일:</label>
                            <input
                                type='date'
                                id='birthDate'
                                name='birthDate'
                                value={birthDate}
                                onChange={handleBirthDateChange}
                            />
                        </div>

                        <div className='formAddress'>
                            <label htmlFor='address1'>주소:</label>
                            <input
                                type='text'
                                id='address1'
                                name='address1'
                                className='addressInput1'
                                value={formData.address1}
                                onChange={handleInputChange}
                            />
                            <input
                                type='text'
                                id='address2'
                                name='address2'
                                className='addressInput2'
                                value={formData.address2}
                                onChange={handleInputChange}
                            />
                        </div>

                        <h2>강의정보</h2>

                        <div className='formAffiliation'>
                            <label htmlFor='affiliation'>소속기관:</label>
                            <input
                                type='text'
                                id='affiliation'
                                name='affiliation'
                                value={formData.affiliation}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className='formSns'>
                            <label htmlFor='snsEmail'>SNS 계정(선택사항):</label>
                            <input
                                type='email'
                                id='snsEmail'
                                name='snsEmail'
                                value={formData.snsEmail}
                                onChange={handleInputChange}
                            />
                        </div>

                        <h2>경력사항</h2>

                        {historyFields.map((field, index) => (
                            <div key={index} className="formHistory">
                                <label htmlFor={`event${index}`}>경력:</label>
                                <input
                                    type="text"
                                    id={`event${index}`}
                                    name="event"
                                    value={field.event}
                                    onChange={(e) => handleHistoryChange(e, index, 'event')}
                                />
                                <label htmlFor={`startDate${index}`}>시작일:</label>
                                <input
                                    type="date"
                                    id={`startDate${index}`}
                                    name="startDate"
                                    value={field.startDate}
                                    onChange={(e) => handleHistoryChange(e, index, 'startDate')}
                                />
                                <label htmlFor={`endDate${index}`}>종료일:</label>
                                <input
                                    type="date"
                                    id={`endDate${index}`}
                                    name="endDate"
                                    value={field.endDate}
                                    onChange={(e) => handleHistoryChange(e, index, 'endDate')}
                                />
                                {index > 0 && (
                                    <button type="button" onClick={() => handleRemoveHistoryField(index)}>제거</button>
                                )}
                            </div>
                        ))}

                        <button type="button" onClick={handleAddHistoryField}>추가</button>

                        <h2>자격증</h2>

                        {certificationFields.map((field, index) => (
                            <div key={index} className="formCertification">
                                <label htmlFor={`certification${index}`}>자격증:</label>
                                <input
                                    type="text"
                                    id={`certification${index}`}
                                    name="certification"
                                    value={field.certification}
                                    onChange={(e) => handleCertificationChange(e, index)}
                                />
                                {index > 0 && (
                                    <button type="button" onClick={() => handleRemoveCertificationField(index)}>제거</button>
                                )}
                            </div>
                        ))}

                        <button type="button" onClick={handleAddCertificationField}>추가</button>

                        <h2>강의과목</h2>

                        {teachingSubjectFields.map((field, index) => (
                            <div key={index} className="formTeachingSubject">
                                <label htmlFor={`subject${index}`}>강의과목:</label>
                                <input
                                    type="text"
                                    id={`subject${index}`}
                                    name="subject"
                                    value={field.subject}
                                    onChange={(e) => handleTeachingSubjectChange(e, index)}
                                />
                                {index > 0 && (
                                    <button type="button" onClick={() => handleRemoveTeachingSubjectField(index)}>제거</button>
                                )}
                            </div>
                        ))}

                        <button type="button" onClick={handleAddTeachingSubjectField}>추가</button>

                        <h2>약관 동의</h2>

                        <div className="agreement">
                            <div id="agreement1">
                                <div className="agreement_title">* 이용약관 동의</div>
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

                        <div className='formGroup'>
                            <button type='submit'>신청하기</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default TeacherForm;
