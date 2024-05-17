import ManageHeader from '../../component/manage/ManageHeader';
import ManageLecture from '../../component/manage/ManageLecture';
import './ManageLecturePage.css'

function ManageLecturePage(){
    return(
        <div className="ManageLecturePage">
            <ManageHeader />
            <ManageLecture />
        </div>
    );
}

export default ManageLecturePage;