import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TeacherForm.css';

function TeacherForm() {
    const [birthDate, setBirthDate] = useState('');
    const [historyFields, setHistoryFields] = useState([{ event: '', startDate: '', endDate: '' }]);
    const [certificationFields, setCertificationFields] = useState([{ certification: '' }]);
    const [teachingSubjectFields, setTeachingSubjectFields] = useState([{ subject: '' }]);

    const handleBirthDateChange = (event) => {
        setBirthDate(event.target.value);
    };

    const handleAddHistoryField = () => {
        const newHistoryFields = [...historyFields, { event: '', startDate: '', endDate: '' }];
        setHistoryFields(newHistoryFields);
    };

    const handleRemoveHistoryField = (index) => {
        const newHistoryFields = [...historyFields];
        newHistoryFields.splice(index, 1);
        setHistoryFields(newHistoryFields);
    };

    const handleHistoryEventChange = (event, index) => {
        const { value } = event.target;
        const newHistoryFields = [...historyFields];
        newHistoryFields[index].event = value;
        setHistoryFields(newHistoryFields);
    };

    const handleHistoryStartDateChange = (event, index) => {
        const { value } = event.target;
        const newHistoryFields = [...historyFields];
        newHistoryFields[index].startDate = value;
        setHistoryFields(newHistoryFields);
    };

    const handleHistoryEndDateChange = (event, index) => {
        const { value } = event.target;
        const newHistoryFields = [...historyFields];
        newHistoryFields[index].endDate = value;
        setHistoryFields(newHistoryFields);
    };

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

    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('/member/myinfo', { withCredentials: true });
            setUserData(response.data);
            setBirthDate(response.data.birth); // 생년월일 초기화
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
        fetchData();
      }, []);
    
      if (!userData) {
        return <div>Loading...</div>;
      }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const teacherData = {
            id: userData.id,
            affiliatedOrganization: event.target.affiliation.value,
            teacherCategory: Array.from(event.target.field).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value),
            snsAddress: event.target.snsEmail.value,
            career: historyFields.map(field => field.event).join(','),
            careerStartYear: historyFields.map(field => field.startDate).join(','),
            careerEndYear: historyFields.map(field => field.endDate).join(','),
            licenseName: certificationFields.map(field => field.certification).join(',')
        };

        try {
            const response = await axios.post('/teacher/apply', teacherData, { withCredentials: true });
            alert('신청이 완료되었습니다.');
        } catch (error) {
            console.error('Error submitting teacher application:', error);
            alert('신청 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className='All' >
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
                                value={userData.name}
                                readOnly
                            />
                        </div>

                        <div className='formEmail'>
                            <label htmlFor='email'>이메일:</label>
                            <input
                                type='email'
                                id='email'
                                name='email'
                                value={userData.email}
                                readOnly
                            />
                        </div>

                        <div className='formNumber'>
                            <label htmlFor='phoneNumber'>전화번호:</label>
                            <input 
                                type='text' 
                                id='phoneNumber' 
                                name='phoneNumber' 
                                value={userData.telNumber}
                                readOnly
                            />
                            <h4>※숫자만 입력 가능합니다.</h4>
                        </div>

                        <div className='formHNumber'>
                            <label htmlFor='mobileNumber'>휴대폰 번호:</label>
                            <input 
                                type='text' 
                                id='mobileNumber' 
                                name='mobileNumber' 
                                value={userData.phone_number}
                                readOnly
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
                                readOnly
                            />
                        </div>

                        <div className='formAddress'>
                            <label htmlFor='address1'>주소:</label>
                            <input 
                                type='text' 
                                id='address1' 
                                name='address1' 
                                className='addressInput1'
                                value={userData.address}
                                readOnly
                            />

                            <label htmlFor='address2'>상세 주소:</label>
                            <input 
                                 
                                id='address2' 
                                name='address2' 
                                className='addressInput2' 
                                value={userData.detail_address}
                                readOnly
                            />
                        </div>

                        <h2>강사정보</h2>

                        <div className='formAffiliation'>
                            <label htmlFor='affiliation'>소속기관:</label>
                            <input type='text' id='affiliation' name='affiliation' />
                        </div>

                        <div className='CheckGroup'>
                            <label>강의분야:</label>
                            <div className="CheckBoxGroup">
                            <input type='checkbox' id='literature' name='field' value='literature' />
                            <label htmlFor='literature'>문학</label>
                            <input type='checkbox' id='art' name='field' value='art' />
                            <label htmlFor='art'>미술</label>
                            <input type='checkbox' id='music' name='field' value='music' />
                            <label htmlFor='music'>음악</label>
                            <input type='checkbox' id='dance' name='field' value='dance' />
                            <label htmlFor='dance'>무용</label>
                            <input type='checkbox' id='video' name='field' value='video' />
                            <label htmlFor='video'>영상</label>
                            <input type='checkbox' id='theater' name='field' value='theater' />
                            <label htmlFor='theater'>연극</label>
                            <input type='checkbox' id='movie' name='field' value='movie' />
                            <label htmlFor='movie'>영화</label>
                            <input type='checkbox' id='koreanMusic' name='field' value='koreanMusic' />
                            <label htmlFor='koreanMusic'>국악</label>
                            <input type='checkbox' id='architecture' name='field' value='architecture' />
                            <label htmlFor='architecture'>건축</label>
                            <input type='checkbox' id='publication' name='field' value='publication' />
                            <label htmlFor='publication'>출판</label>
                            <input type='checkbox' id='comic' name='field' value='comic' />
                            <label htmlFor='comic'>만화</label>
                            <input type='checkbox' id='etc' name='field' value='etc' />
                            <label htmlFor='etc'>기타</label>
                            </div>
                        </div>

                        <div className='SnsEmail'>
                            <label htmlFor='snsEmail'>SNS주소:</label>
                            <input type='email' id='snsEmail' name='snsEmail' />
                        </div>

                        {/* 주요 이력 입력란 */}
                        <div className='formHistory'>
                            <label htmlFor='history'>주요 이력:</label>
                            {historyFields.map((field, index) => (
                                <div key={index} className="historyField">
                                    <input
                                        type='text'
                                        value={field.event}
                                        onChange={(event) => handleHistoryEventChange(event, index)}
                                    />
                                    <div className="dateRange">
                                        <input
                                            type='date'
                                            value={field.startDate}
                                            onChange={(event) => handleHistoryStartDateChange(event, index)}
                                        />
                                        <span> ~ </span>
                                        <input
                                            type='date'
                                            value={field.endDate}
                                            onChange={(event) => handleHistoryEndDateChange(event, index)}
                                        />
                                    </div>
                                    {index === 0 ? (
                                        <button type='button' onClick={handleAddHistoryField}>+</button>
                                    ) : (
                                        <button type='button' onClick={() => handleRemoveHistoryField(index)}>-</button>
                                    )}
                                </div>
                            ))}
                        </div>
                        {/* 주요 이력 입력란 */}

                         {/* 자격증 및 면허 입력란 */}
                         <div className='formGroup'>
                            <label htmlFor='certification'>자격증 및 면허:</label>
                            {certificationFields.map((field, index) => (
                                <div key={index} className="certificationField">
                                    <input
                                        type='text'
                                        value={field.certification}
                                        onChange={(event) => handleCertificationChange(event, index)}
                                    />
                                    {index === 0 ? (
                                        <button type='button' onClick={handleAddCertificationField}>+</button>
                                    ) : (
                                        <button type='button' onClick={() => handleRemoveCertificationField(index)}>-</button>
                                    )}
                                </div>
                            ))}
                        </div>
                        {/* 자격증 및 면허 입력란 */}

                        {/* 강의 가능 분야 입력란 */}
                        <div className='formGroup'>
                            <label htmlFor='teachingSubjects'>강의 가능 분야:</label>
                            {teachingSubjectFields.map((field, index) => (
                                <div key={index} className="teachingSubjectField">
                                    <input
                                        type='text'
                                        value={field.subject}
                                        onChange={(event) => handleTeachingSubjectChange(event, index)}
                                    />
                                    {index === 0 ? (
                                        <button type='button' onClick={handleAddTeachingSubjectField}>+</button>
                                    ) : (
                                        <button type='button' onClick={() => handleRemoveTeachingSubjectField(index)}>-</button>
                                    )}
                                </div>
                            ))}
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
                                    <input type="checkbox" className="checkbox" name="agreement" id="agreement1" />
                                    <label htmlFor="agreement1"></label>
                                </div>
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
