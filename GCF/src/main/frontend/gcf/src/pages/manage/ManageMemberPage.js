import ManageHeader from '../../component/manage/ManageHeader';
import ManageMember from '../../component/manage/ManageMember';
import './ManageMemberPage.css'

function ManageMemberPage(){
    return(
        <div className="ManageMemberPage">
            <ManageHeader />
            <ManageMember />
        </div>
    );
}

export default ManageMemberPage;