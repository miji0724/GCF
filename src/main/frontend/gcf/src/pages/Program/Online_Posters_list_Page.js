import './Online_Posters_list_Page.css';
import Header from '../../component/Header';
import Footer from '../../component/Footer';
import Online_Post_List from '../../component/Program/Online_Post_List'

function Online_Posters_list_Page() {
    return (
        <div className="Online_Posters_list_Page">
            <Header />
            <Online_Post_List />
            <Footer />
        </div>
    );
}


export default Online_Posters_list_Page;