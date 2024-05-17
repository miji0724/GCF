import './LoginForm.css';

const LoginForm = () => {
    return (
        <div className="login_form">
            <div className="title">로그인</div>
            <div className="line"></div>
            <div id="instructions">G-CLASS에 오신 것을 환영합니다.</div>
            <div className="login_center">
                <div className="login_partition">
                    <div className="integration_login">
                        <div>아이디로 로그인</div>
                        <div className="input_login">
                            <div className="input_id">
                                <text>아이디</text>
                                <input />
                            </div>
                            <div className="input_pw">
                                <text>비밀번호</text>
                                <input />
                            </div>
                        </div>
                        <button id="login_btn" type="submit">로그인</button>
                    </div>
                    <div className="sns_login">
                        <div>sns 계정으로 로그인</div>
                        <ul className="sns_login_btn">
                            <li><a href="#">카카오 로그인</a></li>
                            <li><a href="#">네이버 로그인</a></li>
                            <li><a href="#">구글 로그인</a></li>
                        </ul>
                    </div>
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