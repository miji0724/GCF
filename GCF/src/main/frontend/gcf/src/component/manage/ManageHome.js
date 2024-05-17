import './ManageHome.css';
import React from 'react';
import SideMenu from './ManageSideMenu';
import {
    gotoBannerManage,
    gotoNoticeManage,
    gotoMemberManage,
    gotoTeacherManage,
    gotoTeachAppManage,
    gotoLectureManage,
    gotoLecAppManage
} from './ManageUtils';

function ManageHome() {
    return (
        <body>
            <div className='manageHome_container'>
                <SideMenu />
                <div className='manageHome'>
                    <p>HOME</p>
                    <div className='manageHome_menu_area'>
                        <div className='manageHome_big_menu_area'>
                            <div className='manageHome_big_menu' onClick={gotoBannerManage}>배너 및 홈 화면 관리</div>
                            <div className='manageHome_big_menu' onClick={gotoNoticeManage}>공지사항 관리</div>
                            <div className='manageHome_big_menu' onClick={gotoMemberManage}>일반회원 관리</div>
                        </div>
                        <div className='manageHome_small_menu_area'>
                            <div className='manageHome_small_menu' onClick={gotoTeacherManage}>강사회원 관리</div>
                            <div className='manageHome_small_menu' onClick={gotoTeachAppManage}>강사 신청 현황</div>
                            <div className='manageHome_small_menu' onClick={gotoLectureManage}>강의 관리</div>
                            <div className='manageHome_small_menu' onClick={gotoLecAppManage}>강의 신청 현황</div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
}

export default ManageHome;
