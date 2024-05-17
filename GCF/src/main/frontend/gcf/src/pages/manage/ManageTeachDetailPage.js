import ManageHeader from '../../component/manage/ManageHeader';
import ManageTeachDetail from '../../component/manage/ManageTeachDetail';
import './ManageTeachDetailPage.css';

function ManageTeachDetailPage(){
    return(
        <div className="ManageTeachDetailPage">
            <ManageHeader />
            <ManageTeachDetail />
        </div>
    );
}

export default ManageTeachDetailPage;