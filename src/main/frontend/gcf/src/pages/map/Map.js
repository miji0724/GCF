import MapForm from '../../component/map/MapForm';
import './Map.css';
import { useParams } from 'react-router-dom';

const Map = () => {

    const { locationName } = useParams();

    return (
        <div className="map">
            <MapForm locationName={locationName} />
        </div>
    );
}

export default Map;