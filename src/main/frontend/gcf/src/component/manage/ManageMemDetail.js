import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SideMenu from './ManageSideMenu';
import './ManageMemDetail.css';

function ManageMemDetail() {
    const location = useLocation();
    const { member } = location.state || {};

    const [emailId, setEmailId] = useState('');
    const [emailDomain, setEmailDomain] = useState('');

    useEffect(() => {
        if (member && member.email) {
            const { emailId, emailDomain } = splitEmail(member.email);
            setEmailId(emailId);
            setEmailDomain(emailDomain);
        }
    }, [member]);

    if (!member) {
        return <div>멤버 정보가 없습니다.</div>;
    }

    const splitEmail = (email) => {
        const [emailId, emailDomain] = email.split('@');
        return { emailId, emailDomain };
    };

    return (
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
                            <li> <input type='text' id='memDetail_name' value={member.name} readOnly /> </li>
                            <li> <input type='text' id='memDetail_id' value={member.id} readOnly /> </li>
                            <li> <input type='text' id='memDetail_pwd' value={member.password} readOnly /> </li>
                            <li className='memDetail_gender_radio_container'>
                                <input type='radio' name='sex' value='male' checked={member.gender === 'male'} readOnly /> 남자
                                <input type='radio' name='sex' value='female' checked={member.gender === 'female'} readOnly /> 여자
                            </li>
                            <li className='memDetail_birth_radio_container'>
                                <input type='date' id='memDetail_birth_detail' value={member.birthDate} readOnly />
                                <input type='radio' name='birth' value='solar' checked={member.birthType === 'solar'} readOnly /> 양력
                                <input type='radio' name='birth' value='lunar' checked={member.birthType === 'lunar'} readOnly /> 음력
                            </li>
                            <li> <input type="text" id='memDetail_phoneNum' value={member.phone_number} readOnly /></li>
                            <li> <input type="text" id='memDetail_landNum' value={member.landline} readOnly /></li>
                            <li>
                                <input type='text' id='memDetail_emailId' value={emailId} readOnly />
                                &nbsp;@&nbsp;
                                <input type='text' id='memDetail_emailAddr' value={emailDomain} readOnly />
                            </li>
                            <li className='memDetail_zipArea'>
                                <input type='text' id='memDetail_zip' value={member.zipCode} readOnly />
                                <button id='memDetail_zipCheck' disabled>우편번호 조회</button>
                            </li>
                            <li>
                                <input type='text' id='memDetail_addr' value={member.address} readOnly />
                            </li>
                            <li> <input type='text' id='memDetail_addrD' value={member.detail_address} readOnly /></li>
                        </ul>
                    </div>
                </div>
                <div className='memDetail_button_area'>
                    <button id='memDetail_confirm'>수정</button>
                    <button id='memDetail_delete'>삭제</button>
                </div>
            </div>
        </div>
    );
}

export default ManageMemDetail;
