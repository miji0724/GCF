import './FindPw_input.css'
import { useState } from 'react';
import axios from 'axios';

const FindPw_input = ({ onPwChange, onPwChangeError }) => {

    const [FindPwForm, setFindPwForm] = useState({
        id: '',
        email: '',
    });

    const handleFindPw = (e) => {
        e.preventDefault();

        if (!FindPwForm.id || !FindPwForm.email) {
          alert('아이디와 이메일을 입력해주세요.');
          return;
        }

        axios
            .post('/member/findPw', FindPwForm)
            .then((response) => {
                if (response.status === 200) {
                    alert('인증에 성공하였습니다.');
                    onPwChange(FindPwForm.email);
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 404) {
                    console.log(FindPwForm);
                    alert('존재하지 않는 회원이거나 잘못 입력된 정보입니다.');
                    onPwChangeError();
                } else {
                    alert('오류가 발생했습니다.');
                }
            });
    };

    return (
        <div className="findPw_input">
            <div className="title">비밀번호 찾기</div>
            <div className="line"></div>
            <div id="findPw_input_INFO">
                <ul>
                    <li>
                        <input 
                            placeholder='아이디 입력' 
                            value={FindPwForm.id}
                            onChange={(e) => setFindPwForm({ ...FindPwForm, id: e.target.value })}
                        />
                    </li>
                    <li>
                        <input
                            placeholder='이메일 입력("@" 포함)'
                            value={FindPwForm.email}
                            onChange={(e) => setFindPwForm({ ...FindPwForm, email: e.target.value })}
                        />
                    </li>
                </ul>
                <button type="submit" id="findPw_btn" onClick={handleFindPw}>비밀번호 찾기</button>
            </div>
        </div>
    );
}

export default FindPw_input;