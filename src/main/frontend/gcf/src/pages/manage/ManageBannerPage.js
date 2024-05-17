import ManageHeader from '../../component/manage/ManageHeader';
import ManageBanner from '../../component/manage/ManageBanner';
import './ManageBannerPage.css'

function ManageBannerPage(){
    return(
        <div className="ManageBannerPage">
            <ManageHeader />
            <ManageBanner />
        </div>
    );
}

export default ManageBannerPage;