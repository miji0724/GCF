import ManageHeader from '../../component/manage/ManageHeader';
import ManageLecOnDetail from '../../component/manage/ManageLecOnDetail';
import './ManageLecOnDetailPage.css'

function ManageLecOnDetailPage(){
    return(
        <div className="ManageLecOnDetailPage">
            <ManageHeader />
            <ManageLecOnDetail />
        </div>
    );
}

export default ManageLecOnDetailPage;