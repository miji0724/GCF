import './FindId_input.css';
import { useState } from 'react';

const FindId_input = ({ handleButtonClick }) => {

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

    const handleClick = (componentNumber) => {
      handleButtonClick(componentNumber);
    };

    return (
        <div className="findId_input">
            <div className="title">아이디 찾기</div>
            <div className="line"></div>
            <div id="findId_input_INFO">
                <ul>
                    <li><input placeholder='이름 입력' /></li>
                    <li><input type="text" name="cellPhone" id="cellPhone" placeholder="휴대전화번호 입력" maxlength="13" value={phoneNumber} onChange={handlePhoneNumberChange} /></li>
                    <li><input placeholder='이메일 입력("@" 포함)' /></li>
                </ul>
                <button type="submit" id="findId_btn" onClick={() => handleClick(1)}>아이디 찾기</button>
                <button type="submit" onClick={() => handleClick(2)}>존재하지 않는 회원</button>
            </div>
        </div>
    );
}

export default FindId_input;