import React, { useState } from 'react';
import SideMenu from './ManageSideMenu';
import './ManageTeachDetail.css';

function ManageTeachDetail() {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedFileNames, setSelectedFileNames] = useState(['', '', '']); // 세 개의 파일 이름을 저장할 상태

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
        // 해당 인덱스의 파일 입력 엘리먼트 클릭
        document.getElementById(`teachDetail_sCertifi${index + 1}_attachment`).click();
    };

    const handleFileChange = (event, index) => {
        // 파일 선택 이벤트 처리
        const file = event.target.files[0];
        const newSelectedFileNames = [...selectedFileNames];
        newSelectedFileNames[index] = file.name; // 선택된 파일의 이름을 해당 인덱스의 상태에 저장
        setSelectedFileNames(newSelectedFileNames);
        // 선택된 파일을 처리하는 로직 추가 (예: 파일 업로드)
    };

    const [careerInputs, setCareerInputs] = useState([{ id: 1 }]);
    const [sCertifiInputs, setSCertifiInputs] = useState([{ id: 1 }]);
    const [teachAbleInputs, setTeachAbleInputs] = useState([{ id: 1 }]);

    const handleAddCareerInput = () => {
        setCareerInputs([...careerInputs, { id: careerInputs.length + 1 }]);
    };

    const handleRemoveCareerInput = (id) => {
        setCareerInputs(careerInputs.filter(input => input.id !== id));
    };

    const handleAddSCertifiInput = () => {
        setSCertifiInputs([...sCertifiInputs, { id: sCertifiInputs.length + 1 }]);
    };

    const handleRemoveSCertifiInput = (id) => {
        setSCertifiInputs(sCertifiInputs.filter(input => input.id !== id));
    };

    const handleAddTeachAbleInput = () => {
        setTeachAbleInputs([...teachAbleInputs, { id: teachAbleInputs.length + 1 }]);
    };

    const handleRemoveTeachAbleInput = (id) => {
        setTeachAbleInputs(teachAbleInputs.filter(input => input.id !== id));
    };

    return (
        <body>
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
                                <li>&nbsp;</li>
                                <li>상세주소</li>
                                <li>소속기관</li>
                                <li>* 강의분야</li>
                                <li>SNS주소</li>
                                <li>&nbsp;</li>
                                <li>* 주요이력</li>
                                <li>&nbsp;</li>
                                <li>&nbsp;</li>
                                <li>자격증</li>
                                <li>&nbsp;</li>
                                <li>&nbsp;</li>
                                <li>강의가능분야</li>
                                <li>&nbsp;</li>
                                <li>&nbsp;</li>
                            </ul>
                        </div>
                        <div className='teachDetail_right'>
                            <ul>
                                <li> <input type='text' id='teachDetail_name' /></li>
                                <li className='teachDetail_birth_container'>
                                    <input type='date' id='teachDetail_birth_detail' />
                                    <div className="teachDetail_radio_area">
                                        <input type='radio' name='birth' value='solar' /> 양력
                                        <input type='radio' name='birth' value='lunar' /> 음력
                                    </div>
                                </li>
                                <li> <input type="text" id='teachDetail_phoneNum' maxLength="13" value={phoneNumber} onChange={handlePhoneNumberChange} /></li>
                                <li> <input type="text" id='teachDetail_landNum' maxLength="11" /> </li>
                                <li>
                                    <input type='text' id='teachDetail_emailId' />
                                    &nbsp;@&nbsp;
                                    <input type='text' id='teachDetail_emailAddr' />
                                    <select id='teachDetail_email_dropdown'>
                                        <option value="direct_input">직접입력</option>
                                        <option value="naver_input">naver.com</option>
                                    </select>
                                </li>
                                <li className='teachDetail_zipArea'>
                                    <input type='text' id='teachDetail_zip' />
                                    <button id='teachDetail_zipCheck'>우편번호 조회</button>
                                </li>
                                <li><input type='text' id='teachDetail_addr' /></li>
                                <li> <input type='text' id='teachDetail_addrD' /> </li>
                                <li><input type='text' id='teachDetail_organizaion' /></li>
                                <li>
                                    <select id='teachDetail_lec'>{/*문학 미술 음악 무용 영상 연극 영화 국악 건축 출판 만화*/}
                                        <option value='literature'>문학</option>
                                        <option value='art'>미술</option>
                                        <option value='music'>음악</option>
                                        <option value='dancing'>무용</option>
                                        <option value='video'>영상</option>
                                        <option value='theater'>연극</option>
                                        <option value='movie'>영화</option>
                                        <option value='ktm'>국악</option>
                                        <option value='construct'>건축</option>
                                        <option value='publishing'>출판</option>
                                        <option value='comic'>만화</option>
                                        <option value='etc'>기타</option>
                                    </select>
                                </li>
                                <li> <input type='text' id='teachDetail_snsAddr' /></li>
                                <div className='mainCareer_buttonAlign'>
                                    <div className='mainCareer_area'>
                                        {careerInputs.map(input => (
                                            <div key={input.id} className='mainCareer_flexArea'>
                                                <input type='text' className='mainCareer_detail' id={`teachDetail_mainCareer${input.id}_detail`} />
                                                <input type='number' className='mainCareer_startDate' id={`teachDetail_mainCareer${input.id}_startDate`} />~
                                                <input type='number' className='mainCareer_endDate' id={`teachDetail_mainCareer${input.id}_endDate`} />
                                                <button onClick={() => handleRemoveCareerInput(input.id)} style={{backgroundColor: "#FF8585"}}>-</button>
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={handleAddCareerInput}>+</button>
                                </div>
                                <div className='sCertifi_buttonAlign'>
                                    <div className='sCertifi_area'>
                                        {sCertifiInputs.map(input => (
                                            <div key={input.id} className='sCertifi_flexArea'>
                                                <input type='text' className='sCertifi' id={`teachDetail_sCertifi${input.id}`} />
                                                <button onClick={() => handleRemoveSCertifiInput(input.id)} style={{backgroundColor: "#FF8585"}}>-</button>
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={handleAddSCertifiInput}>+</button>
                                </div>
                                <div className='teachAble_buttonAlign'>
                                    <div className='teachAble_area'>
                                        {teachAbleInputs.map(input => (
                                            <div key={input.id} className='teachAble_flexArea'>
                                                <input type='text' className='teachAble' id={`teachDetail_teachAble${input.id}`} />
                                                <button onClick={() => handleRemoveTeachAbleInput(input.id)} style={{backgroundColor: "#FF8585"}}>-</button>
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={handleAddTeachAbleInput}>+</button>
                                </div>

                            </ul>
                        </div>
                    </div>
                    <div className='teachDetail_button_area'>
                        <button id='teachDetail_confirm'>수정</button>
                        <button id='teachDetail_delete'>삭제</button>
                    </div>
                </div>
            </div>
        </body >
    );
}

export default ManageTeachDetail;