import './App.css';
import { useState, useEffect } from 'react';
import Header from './component/Header';
import Footer from './component/Footer';
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
import ManageTeachAppDetailPage from './pages/manage/ManageTeachAppDetailPage';
import ManageLecturePage from './pages/manage/ManageLecturePage';
import ManageLecAppPage from './pages/manage/ManageLecAppPage';
import ManageLecOnDetailPage from './pages/manage/ManageLecOnDetailPage';
import ManageLecOffDetailPage from './pages/manage/ManageLecOffDetailPage';
import ManageLecOnAppDetailPage from './pages/manage/ManageLecOnAppDetailPage';
import ManageLecOffAppDetailPage from './pages/manage/ManageLecOffAppDetailPage';
import Offline_Post_list_Page from './pages/Program/Offline_Post_list_Page';
import { Offline_posters } from './component/Posters/Offline_posters';
import { Online_posters } from './component/Posters/Online_posters';
import OfflineDetails from './pages/Program/Offline_detail_Page';
import PSU from './pages/Program/Pro_Sign_Up_Page';
import Online_Post_list_Page from './pages/Program/Online_Post_list_Page';
import Online_detail_Page from './pages/Program/Online_detail_Page';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        const storedUser = sessionStorage.getItem("member");
        if (storedUser) {
            const { userId, name, loginTime } = JSON.parse(storedUser);
            const currentTime = new Date().getTime();
            const sessionTime = 1800000; // 30분 후 자동 로그아웃
            if (currentTime - loginTime < sessionTime) {
                setIsLoggedIn(true);
                setUserId(userId);
                setName(name);
            } else {
                handleLogout();
            }
        } else {
            setIsLoggedIn(false);
            setUserId("");
            setName("");
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("member");
        setIsLoggedIn(false);
        setUserId("");
        setName("");
        window.location.href = "/";
    };

    const handleLogin = (loginForm) => {
        const loginTime = new Date().getTime();
        sessionStorage.setItem("member", JSON.stringify({ ...loginForm, loginTime }));
        setIsLoggedIn(true);
        setUserId(loginForm.userId);
        setName(loginForm.name);
        window.location.href = "/";
    };

    const Layout = ({ children }) => {
        const location = useLocation();
        const isManagePath = location.pathname.startsWith('/manage');
        
        return (
            <>
                {!isManagePath && <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} userId={userId} name={name} />}
                <main>{children}</main>
                {!isManagePath && <Footer />}
            </>
        );
    };

    return (
        <div className="App">
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
                        <Route path="/login" element={<Login onLogin={handleLogin} />} />
                        <Route path="/signUp" element={<SignUp />} />
                        <Route path="/findId" element={<FindId />} />
                        <Route path="/findPw" element={<FindPw />} />
                        <Route path="/notice/*" element={<Notice />} />
                        <Route path="/map/:locationName" element={<Map />} />
                        <Route path="/schedule" element={<Schedule />} />
                        <Route path="/MyPage" element={<MyPage />} />
                        <Route path="/MyAuthenticationForm" element={<MyPageAuthenticationForm />} />
                        <Route path="/OfflineList/*" element={
                            <Offline_posters>
                                <Routes>
                                    <Route path="" element={<Offline_Post_list_Page />} />
                                    <Route path="details/:id" element={<OfflineDetails />} />
                                    <Route path="details/:id/signup" element={<PSU />} />
                                </Routes>
                            </Offline_posters>
                        } />
                        <Route path="/OnlineList/*" element={
                            <Online_posters>
                                <Routes>
                                    <Route path="" element={<Online_Post_list_Page />} />
                                    <Route path=":category" element={<Online_Post_list_Page />} />
                                    <Route path="details/:id" element={<Online_detail_Page />} />
                                </Routes>
                            </Online_posters>
                        } />
                        <Route path="/manage" element={<ManageHomePage />} />
                        <Route path="/manage/banner" element={<ManageBannerPage />} />
                        <Route path="/manage/notice" element={<ManageNoticePage />} />
                        <Route path="/manage/noticewrite" element={<ManageNoticeWritePage />} />
                        <Route path="/manage/noticewrite/:id" element={<ManageNoticeWritePage />} />
                        <Route path="/manage/member" element={<ManageMemberPage />} />
                        <Route path="/manage/memdetail" element={<ManageMemDetailPage />} />
                        <Route path="/manage/teacher" element={<ManageTeacherPage />} />
                        <Route path="/manage/teachapp" element={<ManageTeachAppPage />} />
                        <Route path="/manage/teachdetail" element={<ManageTeachDetailPage />} />
                        <Route path="/manage/teachappdetail" element={<ManageTeachAppDetailPage />} />
                        <Route path="/manage/lecture" element={<ManageLecturePage />} />
                        <Route path="/manage/lecapp" element={<ManageLecAppPage />} />
                        <Route path="/manage/lecondetail" element={<ManageLecOnDetailPage />} />
                        <Route path="/manage/lecoffdetail" element={<ManageLecOffDetailPage />} />
                        <Route path="/manage/leconappdetail" element={<ManageLecOnAppDetailPage />} />
                        <Route path="/manage/lecoffappdetail" element={<ManageLecOffAppDetailPage />} />
                    </Routes>
                </Layout>
            </Router>
        </div>
    );
}

export default App;
