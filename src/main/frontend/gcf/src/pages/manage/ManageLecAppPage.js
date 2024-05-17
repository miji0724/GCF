import ManageHeader from '../../component/manage/ManageHeader';
import ManageLecApp from '../../component/manage/ManageLecApp';
import './ManageLecAppPage.css'

function ManageLecAppPage(){
    return(
        <div className="ManageLecAppPage">
            <ManageHeader />
            <ManageLecApp />
        </div>
    );
}

export default ManageLecAppPage;