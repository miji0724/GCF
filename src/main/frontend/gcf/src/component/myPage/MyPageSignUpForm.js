import './MyPageSignUpForm.css';
import React, { useState } from 'react';

const MyPageSignUpForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        id: '',
        password: '',
        confirmPassword: '',
        sex: '',
        birth: '',
        cellPhone: '',
        tel: '',
        email1: '',
        email2: '',
        zipCode: '',
        address: '',
        detail_address: '',
        emailAgreement: false,
        messageAgreement: false,
        mailAgreement: false,
        interests: [],
        married: '',
        hasChildren: '',
    });

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
        setFormData(prevData => ({
            ...prevData,
            cellPhone: autoHypenPhone(value)
        }));
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? [...prevData[name], value] : type === 'radio' ? value : checked ? true : false
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // 여기서 서버로 데이터를 전송하거나 다른 작업을 수행합니다.
    };

    return (
        <div className='MyAll' style={{ fontFamily: '"Noto Sans KR", sans-serif' }}>
            <div className="MysignUp_form">
                <div className="Mytitle">정보수정</div>
                <div className="Myline"></div>
                <div className="MysignUp_center">
                    <div className="Mysubtitle">
                        <div id="Mysubtitle1">
                            <div>기본 정보 입력</div>
                            <text>*은 필수 입력 사항입니다.</text>
                        </div>
                        <div className="Mybase_info">
                            <div className="Mybase_left">
                                <ul className="Mybase_left1">
                                    <li>* 이름</li>
                                    <li>* 아이디</li>
                                    <li>* 비밀번호</li>
                                    <li>* 비밀번호 확인</li>
                                    <li>* 성별</li>
                                    <li>* 생년월일</li>
                                    <li>* 휴대폰 번호</li>
                                    <li>전화번호</li>
                                    <li>* 이메일</li>
                                    <li>* 주소</li>
                                    <li></li>
                                    <li>상세주소</li>
                                </ul>
                                <ul className="Mybase_left2">
                                    <li>* 메일수신동의</li>
                                    <li>* 문자수신동의</li>
                                    <li>* 우편수신동의</li>
                                </ul>
                            </div>
                            <div className="Mybase_right">
                                <ul className="Mybase_right1">
                                    <li><input id="name" name="name" value={formData.name} onChange={handleChange} /></li>
                                    <li><input id="id" name="id" value={formData.id} onChange={handleChange} /></li>
                                    <li><input id="password" name="password" value={formData.password} onChange={handleChange} /></li>
                                    <li><input id="password_check" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} /></li>
                                    <li>
                                        <input type="radio" className="radio" name="sex" id="male" value="male" onChange={handleChange} />
                                        <label htmlFor="male">남자</label>
                                        <input type="radio" className="radio" name="sex" id="female" value="female" onChange={handleChange} />
                                        <label htmlFor="female">여자</label>
                                    </li>
                                    <li>
                                        <input type="date" id="birth" name="birth" value={formData.birth} onChange={handleChange} />&nbsp;&nbsp;&nbsp;
                                        <input type="radio" className="radio" name="birth" id="solar" value="solar" onChange={handleChange} />
                                        <label htmlFor="solar">양력</label>
                                        <input type="radio" className="radio" name="birth" id="lunar" value="lunar" onChange={handleChange} />
                                        <label htmlFor="lunar">음력</label>
                                    </li>
                                    <li>
                                        <input type="text" name="cellPhone" id="cellPhone" maxLength="13" value={formData.cellPhone} onChange={handlePhoneNumberChange} />
                                    </li>
                                    <li>
                                        <input type="text" name="tel" id="tel" maxLength="13" value={formData.tel} onChange={handleChange} />
                                    </li>
                                    <li>
                                        <input id="email1" name="email1" value={formData.email1} onChange={handleChange} />@&nbsp;<input id="email2" name="email2" value={formData.email2} onChange={handleChange} />
                                    </li>
                                    <li>
                                        <input id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} />
                                        <button className="check_btn"> 우편번호 조회</button>
                                    </li>
                                    <li><input id="address" name="address" value={formData.address} onChange={handleChange} /></li>
                                    <li><input id="detail_address" name="detail_address" value={formData.detail_address} onChange={handleChange} /></li>
                                </ul>
                                <ul className="Mybase_right2">
                                    <li>
                                        <input type="radio" className="radio" name="emailAgreement" id="email_reception" value="true" onChange={handleChange} />
                                        <label htmlFor="email_reception">동의</label>
                                        <input type="radio" className="radio" name="emailAgreement" id="email_Not_reception" value="false" onChange={handleChange} />
                                        <label htmlFor="email_Not_reception">비동의</label>
                                    </li>
                                    <li>
                                        <input type="radio" className="radio" name="messageAgreement" id="message_reception" value="true" onChange={handleChange} />
                                        <label htmlFor="message_reception">동의</label>
                                        <input type="radio" className="radio" name="messageAgreement" id="message_Not_reception" value="false" onChange={handleChange} />
                                        <label htmlFor="message_Not_reception">비동의</label>
                                    </li>
                                    <li>
                                        <input type="radio" className="radio" name="mailAgreement" id="mail_reception" value="true" onChange={handleChange} />
                                        <label htmlFor="mail_reception">동의</label>
                                        <input type="radio" className="radio" name="mailAgreement" id="mail_Not_reception" value="false" onChange={handleChange} />
                                        <label htmlFor="mail_Not_reception">비동의</label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="Mysubtitle">
                        <div id="Mysubtitle2">
                            <div>부가 정보 입력</div>
                        </div>
                        <div className="Myadded_info">
                            <div className="Myadded_left">
                                <ul className="Myadded_left1">
                                    <li>관심사</li>
                                    <li>결혼여부</li>
                                    <li>자녀유무</li>
                                </ul>
                            </div>
                            <div className="Myadded_right">
                                <ul className="Myadded_right1">
                                    <li>
                                        <input type="checkbox" className="checkbox" name="interests" id="music" value="music" onChange={handleChange} />
                                        <label htmlFor="music">음악</label>
                                        <input type="checkbox" className="checkbox" name="interests" id="education" value="education" onChange={handleChange} />
                                        <label htmlFor="education">교육</label>
                                        <input type="checkbox" className="checkbox" name="interests" id="art" value="art" onChange={handleChange} />
                                        <label htmlFor="art">미술</label>
                                        <input type="checkbox" className="checkbox" name="interests" id="science" value="science" onChange={handleChange} />
                                        <label htmlFor="science">과학</label>
                                        <input type="checkbox" className="checkbox" name="interests" id="design" value="design" onChange={handleChange} />
                                        <label htmlFor="design">디자인</label>
                                        기타&nbsp; <input name="interests" id="interest_etc" value={formData.interests} onChange={handleChange} />
                                    </li>
                                    <li>
                                        <input type="radio" className="radio" name="married" id="married" value="married" onChange={handleChange} />
                                        <label htmlFor="married">기혼</label>
                                        <input type="radio" className="radio" name="married" id="single" value="single" onChange={handleChange} />
                                        <label htmlFor="single">미혼</label>
                                    </li>
                                    <li>
                                        <input type="radio" className="radio" name="hasChildren" id="children_yes" value="true" onChange={handleChange} />
                                        <label htmlFor="children_yes">있음</label>
                                        <input type="radio" className="radio" name="hasChildren" id="children_no" value="false" onChange={handleChange} />
                                        <label htmlFor="children_no">없음</label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="MySibutton_container">
                            <button className="MySibutton">수정하기</button>
                            <button className="MySibutton">저장하기</button>
                            <button className="MySibutton">회원탈퇴</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MyPageSignUpForm;

