import SideMenu from './ManageSideMenu';
import './ManageMemDetail.css';
import React, { useState } from 'react';

function ManageMemDetail() {

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
        <body>
            <div className='memDetail_container'>
                <SideMenu />
                <div className='memDetail'>
                    <p>일반회원 상세정보</p>
                    <div className='memDetail_area'>
                        <div className='memDetail_left'>
                            <ul>
                                <li>* 이름</li>
                                <li>* 아이디</li>
                                <li>* 비밀번호</li>
                                <li>* 성별</li>
                                <li>* 생년월일</li>
                                <li>* 휴대폰 번호</li>
                                <li>전화번호</li>
                                <li>* 이메일</li>
                                <li>* 주소</li>
                                <li>&nbsp;</li>
                                <li>상세주소</li>
                            </ul>
                        </div>
                        <div className='memDetail_right'>
                            <ul>
                                <li> <input type='text' id='memDetail_name' /> </li>
                                <li> <input type='text' id='memDetail_id' /> </li>
                                <li> <input type='text' id='memDetail_pwd' /> </li>
                                <li className='memDetail_gender_radio_container'>
                                    <input type='radio' name='sex' value='male' /> 남자
                                    <input type='radio' name='sex' value='female' /> 여자
                                </li>
                                <li className='memDetail_birth_radio_container'>
                                    <input type='date' id='memDetail_birth_detail' />
                                    <input type='radio' name='birth' value='solar' /> 양력
                                    <input type='radio' name='birth' value='lunar' /> 음력
                                </li>
                                <li> <input type="text" id='memDetail_phoneNum' maxLength="13" value={phoneNumber} onChange={handlePhoneNumberChange} /></li>
                                <li> <input type="text" id='memDetail_landNum' maxLength="11" autoFocus /></li>
                                <li>
                                    <input type='text' id='memDetail_emailId' />
                                    &nbsp;@&nbsp;
                                    <input type='text' id='memDetail_emailAddr' />
                                    <select id='memDetail_email_dropdown'>
                                        <option value="direct_input">직접입력</option>
                                        <option value="naver_input">naver.com</option>
                                    </select>
                                </li>
                                <li className='memDetail_zipArea'>
                                    <input type='text' id='memDetail_zip' />
                                    <button id='memDetail_zipCheck'>우편번호 조회</button>
                                </li>
                                <li>
                                    <input type='text' id='memDetail_addr' />
                                </li>
                                <li> <input type='text' id='memDetail_addrD' /></li>
                            </ul>
                        </div>

                    </div>
                    <div className='memDetail_button_area'>
                        <button id='memDetail_confirm'>수정</button>
                        <button id='memDetail_delete'>삭제</button>
                    </div>
                </div>
            </div>
        </body>
    );
}

export default ManageMemDetail;