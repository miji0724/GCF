import ManageHeader from '../../component/manage/ManageHeader';
import ManageNoticeWrite from '../../component/manage/ManageNoticeWrite';
import './ManageNoticeWritePage.css'

function ManageNoticeWritePage(){
    return(
        <div className="ManageNoticeWritePage">
            <ManageHeader />
            <ManageNoticeWrite />
        </div>
    );
}

export default ManageNoticeWritePage;