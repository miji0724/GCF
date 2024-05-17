import './FindPw_show.css'

const FindPw_show = () => {

    const str = "✔\n\njava1234@project.com 으로\n임시 비밀번호를 발송하였습니다." ;

    return (
        <div className="findPw_show">
            <div className="title">비밀번호 찾기</div>
            <div className="line"></div>
            <div id="findPw_show_id">
                <div className="show_pw">
                    {str}
                </div>
                <button type="submit" id="go_login"><a href="/login">로그인 하러가기</a></button>
            </div>
        </div>
    );
}

export default FindPw_show;