import './SignUpForm.css'
import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';

const SignUpForm = () => {

    const [phoneNumber, setPhoneNumber] = useState('');

    const [isOpen, setIsOpen] = useState(false); // isOpen 상태 추가
    const [zonecode, setZonecode] = useState('');
    const [address, setAddress] = useState('');
    const [detailedAddress, setDetailedAddress] = useState('');
    
    const [formData, setFormData] = useState({
		name: '',
		id: '',
		password: '',
		confirmPassword: '',
		gender: '',
		birth: '',
		email: '',
		
	})
    
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

    const themeObj = {
        bgColor: '#FFFFFF',
        pageBgColor: '#FFFFFF',
        postcodeTextColor: '#C05850',
        emphTextColor: '#222222',
    };

    const postCodeStyle = {
        width: '360px',
        height: '480px',
    };

    const completeHandler = (data) => {
        const { address, zonecode } = data;
        setZonecode(zonecode);
        setAddress(address);
    };

    const closeHandler = (state) => {
        if (state === 'FORCE_CLOSE' || state === 'COMPLETE_CLOSE') { // 모달이 닫힐 때 isOpen 상태를 false로 설정
            setIsOpen(false);
        }
    };

    const toggleHandler = () => {
        setIsOpen((prevOpenState) => !prevOpenState); // isOpen 상태를 토글
    };

    const inputChangeHandler = (event) => {
        setDetailedAddress(event.target.value);
    };


    return (
        <div className="signUp_form">
            <div className="title">회원가입</div>
            <div className="line"></div>
            <div className="signUp_center">
                <div className="subtitle">
                    <div id="subtitle1">
                        <div>기본 정보 입력</div>
                        <text>*은 필수 입력 사항입니다.</text>
                    </div>
                    <div className="base_info">
                        <div className="base_left">
                            <ul className="base_left1">
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
                            </ul>
                            <ul className="base_left2">
                                <li>* 메일수신동의</li>
                                <li>* 문자수신동의</li>
                                <li>* 우편수신동의</li>
                            </ul>
                        </div>
                        <div className="base_right">
                            <ul className="base_right1">
                                <li><input id="name" /></li>
                                <li>
                                    <input id="id" />
                                    <button className="check_btn" id="id_check"> 중복확인</button>
                                </li>
                                <li>
                                    <input id="password" />
                                </li>
                                <li><input id="password_check" /></li>
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
                                    <div>
                                        <div>
                                            <div className='dis_add'>

                                                <div className='zonecode'>
                                                    {zonecode}
                                                    <button className='address_btn'
                                                type="button"
                                                onClick={toggleHandler}>
                                                우편번호 조회
                                            </button>
                                                </div>

                                                
                                            </div>
                                        </div>
                                        {isOpen && (
                                            <div>
                                                <DaumPostcode
                                                    theme={themeObj}
                                                    style={postCodeStyle}
                                                    onComplete={completeHandler}
                                                    onClose={closeHandler}
                                                />
                                            </div>
                                        )}
                                        <div>{address}</div>
                                        <input className='add_input'
                                            value={detailedAddress}
                                            onChange={inputChangeHandler}
                                            placeholder="상세주소 입력"
                                        />
                                    </div>
                                </li>

                            </ul>
                            <ul className="base_right2">
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

                <div className="subtitle">
                    <div id="subtitle2">
                        <div>부가 정보 입력</div>
                    </div>
                    <div className="added_info">
                        <div className="added_left">
                            <ul className="added_left1">
                                <li>관심사</li>
                                <li>결혼여부</li>
                                <li>자녀유무</li>
                            </ul>
                        </div>
                        <div className="added_right">
                            <ul className="added_right1">
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
                            <label for="agreement1"></label>
                        </div>
                        <div id="agreement2">
                            <div className="agreement_title">* 개인정보 수집 및 이용 동의</div>
                            <div className="agreement_content2">이용약관 내용</div>
                            개인정보 수집 및 이용 목적에 동의하시겠습니까?&nbsp;&nbsp;
                            <input type="checkbox" className="checkbox" name="agreement" id="agreement1" />
                            <label for="agreement1"></label>
                        </div>
                        <button type="submit" id="signUp_btn"><a href="/login">회원가입하기</a></button>
                    </div>
                </div>

            </div>
        </div>

    );
}

export default SignUpForm;