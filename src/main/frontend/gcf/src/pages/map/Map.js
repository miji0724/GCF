import Header from '../../component/Header';
import Footer from '../../component/Footer';
import MapForm from '../../component/map/MapForm';
import './Map.css';

const Map = () => {
    return (
        <div className="map">
            <Header />
            <MapForm />
            <Footer />
        </div>
    );
}

export default Map;