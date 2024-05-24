import './MyPageSignUpForm.css'
import React, { useState } from 'react';

const MyPageSignUpForm = () => {

    const [phoneNumber, setPhoneNumber] = useState('');

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

    return (
        <div className='MyAll' style={{ fontFamily: '"Noto Sans KR", sans-serif' }} >
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
                                    <li><input id="name" /></li>
                                    <li>
                                        <input id="id" />
                                        
                                    </li>
                                    <li>
                                        <input id="password" />
                                    </li>
                                    <li><input id="password_check" /></li>
                                    <li>
                                        <input type="radio" className="radio" name="sex" id="male" />
                                        <label for="male">남자</label>
                                        <input type="radio" className="radio" name="sex" id="femail" />
                                        <label for="female">여자</label>
                                    </li>
                                    <li>
                                        <input type="date" id="birth" />&nbsp;&nbsp;&nbsp;
                                        <input type="radio" className="radio" name="birth" id="solar" />
                                        <label for="solar">양력</label>
                                        <input type="radio" className="radio" name="birth" id="lunar" />
                                        <label for="lunar">음력</label>
                                    </li>
                                    <li>
                                        <input type="text" name="cellPhone" id="cellPhone" maxlength="13" value={phoneNumber} onChange={handlePhoneNumberChange} />
                                    </li>
                                    <li>
                                        <input type="text" name="tel" id="tel" maxlength="13" />
                                    </li>
                                    <li>
                                        <input id="email1" />@&nbsp;<input id="email2" />
                                    </li>
                                    <li>
                                        <input id="zipCode" />
                                        <button className="check_btn"> 우편번호 조회</button>
                                    </li>
                                    <li><input id="address" /></li>
                                    <li><input id="detail_address" /></li>
                                </ul>
                                <ul className="Mybase_right2">
                                    <li>
                                        <input type="radio" className="radio" name="agreement1" id="email_reception" />
                                        <label for="email_reception">동의</label>
                                        <input type="radio" className="radio" name="agreement1" id="email_Not_reception" />
                                        <label for="email_Not_reception">비동의</label>
                                    </li>
                                    <li>
                                        <input type="radio" className="radio" name="agreement2" id="message_reception" />
                                        <label for="message_reception">동의</label>
                                        <input type="radio" className="radio" name="agreement2" id="message_Not_reception" />
                                        <label for="message_Not_reception">비동의</label>
                                    </li>
                                    <li>
                                        <input type="radio" className="radio" name="agreement3" id="mail_reception" />
                                        <label for="mail_reception">동의</label>
                                        <input type="radio" className="radio" name="agreement3" id="mail_Not_reception" />
                                        <label for="mail_Not_reception">비동의</label>
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
                                        <input type="checkbox" className="checkbox" name="interest" id="music" />
                                        <label for="music">음악</label>
                                        <input type="checkbox" className="checkbox" name="interest" id="education" />
                                        <label for="education">교육</label>
                                        <input type="checkbox" className="checkbox" name="interest" id="art" />
                                        <label for="art">미술</label>
                                        <input type="checkbox" className="checkbox" name="interest" id="science" />
                                        <label for="science">과학</label>
                                        <input type="checkbox" className="checkbox" name="interest" id="design" />
                                        <label for="design">디자인</label>
                                        기타&nbsp; <input name="interest" id="interest_etc" />
                                    </li>
                                    <li>
                                        <input type="radio" className="radio" name="marital" id="children_y" />
                                        <label for="children_y">기혼</label>
                                        <input type="radio" className="radio" name="marital" id="children_n" />
                                        <label for="children_n">미혼</label>
                                    </li>
                                    <li>
                                        <input type="radio" className="radio" name="children" id="married" />
                                        <label for="married">있음</label>
                                        <input type="radio" className="radio" name="children" id="single" />
                                        <label for="single">없음</label>
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
}

export default MyPageSignUpForm;