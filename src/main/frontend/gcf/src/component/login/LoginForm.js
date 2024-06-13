import './LoginForm.css';
import axios from 'axios';
import { useState } from 'react';

const LoginForm = ({ onLogin }) => {

    const [loginForm, setLoginForm] = useState({
        id: "",
        password: "",
    });

    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        axios.post('/member/login', loginForm)
            .then(response => {
                if (response.status === 200) {
                    alert("로그인되었습니다.")
                    onLogin({
                        userId: loginForm.id, 
                        name: loginForm.name
                    });
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    console.log(loginForm);
                    setError('아이디 또는 비밀번호가 잘못되었습니다.');
                } else {
                    setError('로그인 중 오류가 발생했습니다.');
                }
            });
    };
    
    return (
        <div className="login_form">
            <div className="title">로그인</div>
            <div className="line"></div>
            <div id="instructions">G-CLASS에 오신 것을 환영합니다.</div>
            <div className="login_center">
                    <div className="integration_login">
                        <div>로그인</div>
                        <div className="input_login">
                            <div className="input_id">
                                <label>아이디</label>
                                <input type="text" value={loginForm.id} onChange={(e) => setLoginForm({ ...loginForm, id: e.target.value })} />
                            </div>
                            <div className="input_pw">
                                <label>비밀번호</label>
                                <input type="password" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} />
                            </div>
                        </div>
                        <button id="login_btn" type="submit" onClick={handleLogin}>로그인</button>
                        {error && <div className="error">{error}</div>}
                    </div>
                <div className="login_bottom">
                    <a href='/signUp'>회원가입&nbsp;</a> | 
                    <a href='/findId'> &nbsp;아이디 찾기&nbsp;</a> | 
                    <a href='/findPw'> &nbsp;비밀번호 찾기</a>
                </div>
            </div>
        </div>

    );
}

export default LoginForm;