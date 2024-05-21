import './App.css';
import Home from './pages/Home';
import Login from './pages/login/Login';
import SignUp from './pages/signUp/SignUp';
import FindId from './pages/login/FindId';
import FindPw from './pages/login/FindPw';
import Notice from './pages/notice/Notice';
import Map from './pages/map/Map';
import Schedule from './pages/schedule/Schedule';
import MyPage from './pages/myPage/MyPage';
import MyPageAuthenticationForm from './pages/myPage/MyPageAuthenticationForm';
import ManageBannerPage from './pages/manage/ManageBannerPage';
import ManageHomePage from './pages/manage/ManageHomePage';
import ManageNoticePage from './pages/manage/ManageNoticePage';
import ManageNoticeWritePage from './pages/manage/ManageNoticeWritePage';
import ManageMemberPage from './pages/manage/ManageMemberPage';
import ManageMemDetailPage from './pages/manage/ManageMemDetailPage';
import ManageTeacherPage from './pages/manage/ManageTeacherPage';
import ManageTeachAppPage from './pages/manage/ManageTeachAppPage';
import ManageTeachDetailPage from './pages/manage/ManageTeachDetailPage';
import ManageLecturePage from './pages/manage/ManageLecturePage';
import ManageLecAppPage from './pages/manage/ManageLecAppPage';
import ManageLecOnDetailPage from './pages/manage/ManageLecOnDetailPage';
import ManageLecOffDetailPage from './pages/manage/ManageLecOffDetailPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {

    return (

        
        <div className="App">
            <Router>
                <Routes className="home">
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signUp" element={<SignUp />} />
                    <Route path="/findId" element={<FindId />} />
                    <Route path="/findPw" element={<FindPw />} />
                    <Route path="/notice" element={<Notice />} />
                    <Route path="/map" element={<Map />} />
                    <Route path="/schedule" element={<Schedule />} />
                </Routes>
                <Routes className="myPage">
                    <Route path="/MyPage" element={<MyPage />} />
                    <Route path="/MyAuthentication" element={<MyPageAuthenticationForm />} />
                </Routes>
                <Routes className="manage">
                    <Route path="/manage" element={<ManageHomePage />} />
                    <Route path="/manage/banner" element={<ManageBannerPage />} />
                    <Route path="/manage/notice" element={<ManageNoticePage />} />
                    <Route path="/manage/noticewrite" element={<ManageNoticeWritePage />} />
                    <Route path="/manage/member" element={<ManageMemberPage />} />
                    <Route path="/manage/memdetail" element={<ManageMemDetailPage />} />
                    <Route path="/manage/teacher" element={<ManageTeacherPage />} />
                    <Route path="/manage/teachapp" element={<ManageTeachAppPage />} />
                    <Route path="/manage/teachdetail" element={<ManageTeachDetailPage />} />
                    <Route path="/manage/lecture" element={<ManageLecturePage />} />
                    <Route path="/manage/lecapp" element={<ManageLecAppPage />} />
                    <Route path="/manage/lecondetail" element={<ManageLecOnDetailPage />} />
                    <Route path="/manage/lecoffdetail" element={<ManageLecOffDetailPage />} />
                </Routes>
            </Router>
        </div>
    );

}

export default App;
