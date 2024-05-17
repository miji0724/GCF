import './Schedule.css';
import Header from '../../component/Header';
import ScheduleForm from '../../component/schedule/ScheduleForm';
import Footer from '../../component/Footer';

const Schedule = () => {
    return (
        <div className="schedule">
            <Header />
            <ScheduleForm />
            <Footer />
        </div>
    );
}

export default Schedule;