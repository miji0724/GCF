import React, { useRef, useEffect, useState } from 'react';
import './MapForm.css';

const MapForm = ({ locationName }) => {
    const mapRef = useRef(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [location, setLocation] = useState(null);
    const [tel, setTel] = useState(null);

    const locations = {
        '김포아트홀': { address: '경기 김포시 돌문로 26', tel: '031-996-1605' },
        '김포아트빌리지 한옥마을': { address: '경기 김포시 모담공원로 170-7', tel: '031-999-3995' },
        '김포아트빌리지': { address: '경기 김포시 모담공원로 170', tel: '031-999-3995' },
        '통진두레 문화센터': { address: '경기 김포시 통진읍 김포대로 2347-8', tel: '031-999-3982' },
        '김포국제조각공원': { address: '경기 김포시 월곶면 고막리 435-14', tel: '031-999-3985' },
        '월곶생활문화센터': { address: '경기 김포시 월곶면 군하로276번길 20', tel: '031-999-3986' },
        '김포평화문화관': { address: '경기 김포시 월곶면 용강로13번길 38 김포평화문화관', tel: '031-999-3987' },
        '작은미술관 보구곶': { address: '경기 김포시 월곶면 문수산로 373', tel: '031-982-7345' },
        '애기봉평화생태공원': { address: '경기 김포시 월곶면 평화공원로 289', tel: '031-989-7492' },
    };

    const moveMapToAddress = (address) => {
        const { kakao } = window;
        const geocoder = new kakao.maps.services.Geocoder();

        kakao.maps.load(() => {
            const container = mapRef.current;
            const map = new kakao.maps.Map(container, {
                center: new kakao.maps.LatLng(37.632221, 126.721996),
                level: 3
            });

            geocoder.addressSearch(address, function (result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                    map.setCenter(coords);

                    new kakao.maps.Marker({
                        position: coords,
                        map: map
                    });
                } else {
                    alert('주소를 찾을 수 없습니다.');
                }
            });
        });
    };

    useEffect(() => {
        if (locationName && locations[locationName]) {
            const { address, tel } = locations[locationName];
            moveMapToAddress(address);
            setSelectedLocation(locationName);
            setLocation(address);
            setTel(tel);
        }
    }, [locationName]);

    const handleLocationClick = (location, locationName, tel) => {
        moveMapToAddress(location);
        setSelectedLocation(locationName);
        setLocation(location);
        setTel(tel);
    };

    return (
        <div className="map_form">
            <div className="title">위치</div>
            <div className="line"></div>
            <div className="map_body">
                <div className="map_sidebar">
                    <ul>
                        {Object.entries(locations).map(([name, { address, tel }]) => (
                            <li
                                key={name}
                                onClick={() => handleLocationClick(address, name, tel)}
                                className={selectedLocation === name ? 'selected' : ''}
                            >
                                {name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="map_body_center">
                    <div className="map_info">
                        <div className="map_title">{selectedLocation}</div>
                        <div className="map_tel">전화번호 : {tel}</div>
                        <div className="map_address">주소 : {location}</div>
                    </div>
                    <div id="map" ref={mapRef}></div>
                </div>
                <div className="map_traffic">
                    <div className="park">
                        <div id="map_traffic_title">주차장 이용안내</div>
                        <div id="traffic_contents">.</div>
                    </div>
                    <div className="subway">
                        <div id="map_traffic_title">지하철역</div>
                        <div id="traffic_contents">.</div>
                    </div>
                    <div className="bus">
                        <div id="map_traffic_title">버스 정류장</div>
                        <div id="traffic_contents">.</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MapForm;