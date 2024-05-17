import ManageHeader from '../../component/manage/ManageHeader';
import ManageMemDetail from '../../component/manage/ManageMemDetail';
import './ManageMemDetailPage.css'

function ManageMemDetailPage(){
    return(
        <div className="ManageMemDetailPage">
            <ManageHeader />
            <ManageMemDetail />
        </div>
    );
}

export default ManageMemDetailPage;