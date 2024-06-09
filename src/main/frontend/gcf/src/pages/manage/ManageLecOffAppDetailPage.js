import ManageHeader from '../../component/manage/ManageHeader';
import ManageLecOffAppDetail from '../../component/manage/ManageLecOffAppDetail';
import './ManageLecOffAppDetailPage.css'

function ManageLecOffAppDetailPage(){
    return(
        <div className="ManageMemberPage">
            <ManageHeader />
            <ManageLecOffAppDetail />
        </div>
    );
}

export default ManageLecOffAppDetailPage;