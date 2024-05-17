import Header from "../../component/Header";
import Footer from "../../component/Footer";
import LeftMenuBar_teacher from "../../component/myPage/LeftMenuBar_teacher";
import './MyPage.css'

const MyPage = () => {

    return (
        <div className="MyPage">
            <Header />
            <LeftMenuBar_teacher />
            <Footer />
        </div>
    );
}

export default MyPage;