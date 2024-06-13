import ManageHeader from '../../component/manage/ManageHeader';
import ManageLecOnAppDetail from '../../component/manage/ManageLecOnAppDetail';
import './ManageLecOnAppDetailPage.css'

function ManageLecOnAppDetailPage(){
    return(
        <div className="ManageLecOnAppDetailPage">
            <ManageHeader />
            <ManageLecOnAppDetail />
        </div>
    );
}

export default ManageLecOnAppDetailPage;