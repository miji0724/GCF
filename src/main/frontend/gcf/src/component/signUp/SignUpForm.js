import './SignUpForm.css'
import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {

	const navigate = useNavigate();
    const [idAvailable, setIdAvailable] = useState(false);
    const [address, setAddress] = useState('');

    const [isOpen, setIsOpen] = useState(false); // isOpen 상태 추가
    const [zonecode, setZonecode] = useState('');
    
    const [agreement4Checked, setAgreement4Checked] = useState(false);
    const [agreement5Checked, setAgreement5Checked] = useState(false);
    
    
    const [formData, setFormData] = useState({
        name: '',
        id: '',
        password: '',
        confirm_password: '',
        birth: '',
        phone_number: '',
        telNumber: '',
        address: '',
        detail_address: '',
        email1: '',
        email2: '',
        email: '',
        email_agreement: '', 
        message_agreement: '',
        mail_agreement: '',
        interests: [],
	    married: '', 
	    hasChildren: '', 
	})

    const handleCheckId = () => {
        axios.get(`/checkId?id=${formData.id}`)
            .then(response => {
                alert(response.data);
                if (response.status === 200) {
                    setIdAvailable(true);
                }
            })
            .catch(error => {
                alert(error.response.data);
                console.error(error);
            });
    };

    const handleAgreement4Change = () => {
        setAgreement4Checked(!agreement4Checked);
    };

    const handleAgreement5Change = () => {
        setAgreement5Checked(!agreement5Checked);
    };

	const handleEmailChange = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            email: `${prevFormData.email1}@${prevFormData.email2}`,
        }));
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.name || !formData.id || !formData.password || !formData.confirm_password || !formData.birth || !formData.phone_number || !formData.email1 || !formData.email2 || !formData.address || !formData.email_agreement || !formData.message_agreement || !formData.mail_agreement) {
            let errorMessage = '다음 필수 입력 값을 입력해주세요:\n';
        
            if (!formData.name) errorMessage += '- 이름\n';
            if (!formData.id) errorMessage += '- 아이디\n';
            if (!formData.password) errorMessage += '- 비밀번호\n';
            if (!formData.confirm_password) errorMessage += '- 비밀번호 확인\n';
            if (!formData.birth) errorMessage += '- 생년월일\n';
            if (!formData.phone_number) errorMessage += '- 휴대폰 번호\n';
            if (!formData.email1) errorMessage += '- 이메일\n';
			if (!formData.email2) errorMessage += '- 이메일\n';
            if (!formData.address) errorMessage += '- 주소\n';
            if (!formData.email_agreement) errorMessage += '- 이메일 수신 동의\n';
            if (!formData.message_agreement) errorMessage += '- 문자 수신 동의\n';
            if (!formData.mail_agreement) errorMessage += '- 우편 수신 동의\n';
        
            alert(errorMessage);
            return;
        }

        if (!agreement4Checked || !agreement5Checked) {
            alert("이용약관에 모두 동의해야 회원가입이 가능합니다.");
            return;
        }

		
		axios.post("/signUp/ok", formData)
		.then(response => {
			alert(response.data);
			console.log(response.data); // 회원가입 성공 시 처리
			navigate("/login");
		})
		.catch(error => {
			alert(error.response.data);
			console.error(error); // 오류 발생 시 처리
		});
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
        const hyphenatedPhoneNumber = autoHypenPhone(value);
        setFormData({ ...formData, phone_number: hyphenatedPhoneNumber });
    };

    const handleInterestChange = (value) => {
        // formData.interest가 undefined인 경우 빈 배열로 초기화
        const interests = formData.interests || [];
        
        if (interests.includes(value)) {
            // 이미 선택된 관심사인 경우, 해당 관심사를 배열에서 제거
            setFormData({ ...formData, interests: interests.filter(item => item !== value) });
        } else {
            // 선택되지 않은 관심사인 경우, 배열에 추가
            setFormData({ ...formData, interests: [...interests, value] });
        }
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
        setFormData(prevFormData => ({
            ...prevFormData,
            address: address,
            zonecode: zonecode
        }));
    };

    const closeHandler = (state) => {
        if (state === 'FORCE_CLOSE' || state === 'COMPLETE_CLOSE') { // 모달이 닫힐 때 isOpen 상태를 false로 설정
            setIsOpen(false);
        }
    };

    const toggleHandler = () => {
        setIsOpen((prevOpenState) => !prevOpenState); // isOpen 상태를 토글
    };


    return (
        <div className="signUp_form">
            <div className="title">회원가입</div>
            <div className="line"></div>
            <form onSubmit={handleSubmit}>
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
	                                <li><input name="name" id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} /></li>
	                                <li>
	                                    <input name="id" id="id" value={formData.id} onChange={(e) => {setFormData({ ...formData, id: e.target.value }); setIdAvailable(false);}}/>
	                                    <button type="button" className="check_btn" id="id_check" onClick={handleCheckId}> 중복확인</button>
                                        {/* {idAvailable && <span className="complete"> 중복 확인 완료</span>} */}
	                                </li>
	                                <li>
	                                    <input name="password" id="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
	                                </li>
	                                <li>
	                                	<input id="confirm_password" name="confirm_password" value={formData.confirm_password} onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })} />
	                                </li>
									<li>
										<input type="date" name="birth" id="birth" value={formData.birth} onChange={(e) => setFormData({ ...formData, birth: e.target.value })} />
									</li>
	                                <li>
	                                    <input type="text" name="phone_number" id="phone_number" maxLength="13" value={formData.phone_number} onChange={handlePhoneNumberChange} />
	                                </li>
	                                <li>
	                                    <input type="text" name="tel_number" id="tel_number" maxLength="13" value={formData.telNumber} onChange={(e) => setFormData({ ...formData, telNumber: e.target.value })} />
	                                </li>
	                                <li className='email'>
	                                    <input id="email1" name="email1" value={formData.email1} onChange={(e) => {setFormData({ ...formData, email1: e.target.value }); handleEmailChange();}} />@&nbsp;
	                                    <input id="email2" name="email2" value={formData.email2} onChange={(e) => {setFormData({ ...formData, email2: e.target.value }); handleEmailChange();}} />
	                                </li>
	                                <li>
	                                    <div>
	                                        <div>
	                                            <div className='dis_add'>
	                                                <div className='zonecode'>
	                                                	<div className="zonecode_view">
	                                                    	{zonecode}
	                                                    </div>
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
	                                                    value={formData.address}
	                                                />
	                                            </div>
	                                        )}
	                                        <div className='address' name="address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })}>
	                                        	{address}
	                                        </div>
	                                        <input className='add_input'
	                                        	name="detail_address"
	                                            value={formData.detail_address}
	                                            onChange={(e) => setFormData({ ...formData, detail_address: e.target.value })}
	                                            placeholder="상세주소 입력"
	                                        />
	                                    </div>
	                                </li>
	
	                            </ul>
	                            <ul className="base_right2">
	                                <li>
	                                    <input type="radio" className="radio" name="email_agreement" id="email_agreement" value={true} onChange={(e) => setFormData({ ...formData, email_agreement: e.target.value })} />
	                                    <label htmlFor="email_agreement">동의</label>
	                                    <input type="radio" className="radio" name="email_agreement" id="email_disagreement" value={false}  onChange={(e) => setFormData({ ...formData, email_agreement: e.target.value })} />
	                                    <label htmlFor="email_agreement">비동의</label>
	                                </li>
	                                <li>
	                                    <input type="radio" className="radio" name="message_agreement" id="message_agreement" value={true} onChange={(e) => setFormData({ ...formData, message_agreement: e.target.value })} />
	                                    <label htmlFor="message_agreement">동의</label>
	                                    <input type="radio" className="radio" name="message_agreement" id="message_disagreement" value={false} onChange={(e) => setFormData({ ...formData, message_agreement: e.target.value })} />
	                                    <label htmlFor="message_agreement">비동의</label>
	                                </li>
	                                <li>
	                                    <input type="radio" className="radio" name="mail_agreement" id="mail_agreement" value={true} onChange={(e) => setFormData({ ...formData, mail_agreement: e.target.value })} />
	                                    <label htmlFor="mail_reception">동의</label>
	                                    <input type="radio" className="radio" name="mail_agreement" id="mail_disagreement" value={false} onChange={(e) => setFormData({ ...formData, mail_agreement: e.target.value })} />
	                                    <label htmlFor="mail_agreement">비동의</label>
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
	                                    <input type="checkbox" className="checkbox" name="interest" id="music" value="음악" onChange={(e) => handleInterestChange(e.target.value)}  />
	                                    <label htmlFor="music">음악</label>
	                                    <input type="checkbox" className="checkbox" name="interest" id="education" value="교육" onChange={(e) => handleInterestChange(e.target.value)}  />
	                                    <label htmlFor="education">교육</label>
	                                    <input type="checkbox" className="checkbox" name="interest" id="art" value="미술" onChange={(e) => handleInterestChange(e.target.value)}  />
	                                    <label htmlFor="art">미술</label>
	                                    <input type="checkbox" className="checkbox" name="interest" id="science" value="과학" onChange={(e) => handleInterestChange(e.target.value)}  />
	                                    <label htmlFor="science">과학</label>
	                                    <input type="checkbox" className="checkbox" name="interest" id="design" value="디자인" onChange={(e) => handleInterestChange(e.target.value)}  />
	                                    <label htmlFor="design">디자인</label>
	                                </li>
	                                <li>
	                                    <input type="radio" className="radio" name="married" id="married_y" value={true} onChange={(e) => setFormData({ ...formData, married: e.target.value })} />
	                                    <label htmlFor="married_y">기혼</label>
	                                    <input type="radio" className="radio" name="married" id="married_n" value={false} onChange={(e) => setFormData({ ...formData, married: e.target.value })} />
	                                    <label htmlFor="married_n">미혼</label>
	                                </li>
	                                <li>
	                                    <input type="radio" className="radio" name="hasChildren" id="hasChildren_y" value={true} onChange={(e) => setFormData({ ...formData, hasChildren: e.target.value })} />
	                                    <label htmlFor="hasChildren_y">있음</label>
	                                    <input type="radio" className="radio" name="hasChildren" id="hasChildren_n" value={false} onChange={(e) => setFormData({ ...formData, hasChildren: e.target.value })} />
	                                    <label htmlFor="hasChildren_n">없음</label>
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
	                            <input type="checkbox" className="checkbox" name="agreement" checked={agreement4Checked} onChange={handleAgreement4Change} />
	                            <label htmlFor="agreement1"></label>
	                        </div>
	                        <div id="agreement2">
	                            <div className="agreement_title">* 개인정보 수집 및 이용 동의</div>
	                            <div className="agreement_content2">이용약관 내용</div>
	                            개인정보 수집 및 이용 목적에 동의하시겠습니까?&nbsp;&nbsp;
	                            <input type="checkbox" className="checkbox" name="agreement" checked={agreement5Checked} onChange={handleAgreement5Change} />
	                            <label htmlFor="agreement1"></label>
	                        </div>
	                        <button type="submit" id="signUp_btn" >회원가입하기</button>
	                    </div>
	                </div>
	
	            </div>
	         </form>
        </div>

    );
}

export default SignUpForm;