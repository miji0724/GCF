import ManageHeader from '../../component/manage/ManageHeader';
import ManageLecOffDetail from '../../component/manage/ManageLecOffDetail';
import './ManageLecOffDetailPage.css'

function ManageLecOffDetailPage(){
    return(
        <div className="ManageMemberPage">
            <ManageHeader />
            <ManageLecOffDetail />
        </div>
    );
}

export default ManageLecOffDetailPage;