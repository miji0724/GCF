import ManageHeader from '../../component/manage/ManageHeader';
import ManageNotice from '../../component/manage/ManageNotice';
import './ManageNoticePage.css'

function ManageNoticePage(){
    return(
        <div className="ManageNoticePage">
            <ManageHeader />
            <ManageNotice />
        </div>
    );
}

export default ManageNoticePage;