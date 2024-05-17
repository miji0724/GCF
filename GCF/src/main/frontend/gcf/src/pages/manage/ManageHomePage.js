import ManageHeader from '../../component/manage/ManageHeader';
import ManageHome from '../../component/manage/ManageHome';
import './ManageHomePage.css'

function ManageHomePage(){
    return(
        <div className="ManageHomePage">
            <ManageHeader />
            <ManageHome />
        </div>
    );
}

export default ManageHomePage;