import React from 'react';
import './ManageSideMenu.css';
import { 
    gotoBannerManage,
    gotoNoticeManage,
    gotoMemberManage,
    gotoTeacherManage,
    gotoTeachAppManage,
    gotoLectureManage,
    gotoLecAppManage
} from './ManageUtils'; 

function SideMenu() {
    return (
        <div className='sidemenu'>
            <ul>
                <li><p onClick={gotoBannerManage}>배너 및 홈 화면 관리</p></li>
                <li><p onClick={gotoNoticeManage}>공지사항 관리</p></li>
                <li><p onClick={gotoMemberManage}>일반회원 관리</p></li>
                <li><p onClick={gotoTeacherManage}>강사회원 관리</p></li>
                <li><p onClick={gotoTeachAppManage}>강사 신청 현황</p></li>
                <li><p onClick={gotoLectureManage}>강의 관리</p></li>
                <li><p onClick={gotoLecAppManage}>강의 신청 현황</p></li>
            </ul>
        </div>
    );
}

export default SideMenu;