import './Footer.css';
import logo from '../img/logo.png';
import kakaotalk from '../img/kakaotalk.png';
import blog from '../img/blog.png'
import youtube from '../img/youtube.png'
import instagram from '../img/instagram.png'
import facebook from '../img/facebook.png'


function Footer() {
    return (
        <footer>
            <div className='left_footer'>
                <div className="logo2">
                    <a href="/"><img src={logo} alt="Logo" /></a>
                </div>
                <div className="text">
                    <div><a href="#">개인정보처리정책</a> | <a href="#">이용약관</a> | <a href="#">저작권관리</a></div>
                    <div>주소. 경기도 김포시 -</div>
                    <div>TEL. 123-4567  이메일. ab@project.com  담당자. 김자바</div>
                </div>
            </div>
            <div className='right_footer'>
                <ul>
                    <li><a href="/"><img src={kakaotalk} alt="Kakaotalk" /></a></li>
                    <li><a href="/"><img src={blog} alt="Blog" /></a></li>
                    <li><a href="/"><img src={youtube} alt="Youtube" /></a></li>
                    <li><a href="/"><img src={instagram} alt="Instagram" /></a></li>
                    <li><a href="/"><img src={facebook} alt="Facebook" /></a></li>
                </ul>
            </div>


        </footer>
    );
}

export default Footer;