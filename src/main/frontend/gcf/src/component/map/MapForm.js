import React, { useRef, useEffect, useState } from 'react';
import './MapForm.css';


const MapForm = () => {
    const mapRef = useRef(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [location, setLocation] = useState(null);
    const [tel, setTel] = useState(null);

    const moveMapToAddress = (address) => {
        const { kakao } = window;
        const geocoder = new kakao.maps.services.Geocoder();

        // Kakao Maps API 초기화
        kakao.maps.load(() => {
            const container = mapRef.current;
            const map = new kakao.maps.Map(container, {
                center: new kakao.maps.LatLng(37.632221, 126.721996),
                level: 3
            });

            geocoder.addressSearch(address, function(result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    const coords = new kakao.maps.LatLng(result[0].y, result[0].x); // 좌표 변환
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
        moveMapToAddress('경기 김포시 돌문로 26');
        setSelectedLocation('김포 아트홀');
        setLocation('경기 김포시 돌문로 26');
        setTel('031-996-1605');
    }, []);

    // 장소 클릭 이벤트
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
                        <li onClick={() => handleLocationClick('경기 김포시 돌문로 26','김포아트홀', '031-996-1605')} className={selectedLocation === '김포 아트홀' ? 'selected' : ''}>김포 아트홀</li>
                        <li onClick={() => handleLocationClick('경기 김포시 모담공원로 170-7', '김포아트빌리지 한옥마을', '031-999-3995')} className={selectedLocation === '김포아트빌리지 한옥마을' ? 'selected' : ''}>김포아트빌리지 한옥마을</li>
                        <li onClick={() => handleLocationClick('경기 김포시 모담공원로 170', '김포아트빌리지', '031-999-3995')} className={selectedLocation === '김포아트빌리지' ? 'selected' : ''}>김포아트빌리지</li>
                        <li onClick={() => handleLocationClick('경기 김포시 통진읍 김포대로 2347-8', '통진두레 문화센터', '031-999-3982')} className={selectedLocation === '통진두레 문화센터' ? 'selected' : ''}>통진두레 문화센터</li>
                        <li onClick={() => handleLocationClick('경기 김포시 월곶면 고막리 435-14', '김포국제조각공원', '031-999-3985')} className={selectedLocation === '김포국제조각공원' ? 'selected' : ''}>김포국제조각공원</li>
                        <li onClick={() => handleLocationClick('경기 김포시 월곶면 군하로276번길 20', '월곶생활문화센터', '031-999-3986')} className={selectedLocation === '월곶생활문화센터' ? 'selected' : ''}>월곶생활문화센터</li>
                        <li onClick={() => handleLocationClick('경기 김포시 월곶면 용강로13번길 38 김포평화문화관', '김포평화문화관', '031-999-3987')} className={selectedLocation === '김포평화문화관' ? 'selected' : ''}>김포평화문화관</li>
                        <li onClick={() => handleLocationClick('경기 김포시 월곶면 문수산로 373', '작은미술관 보구곶', '031-982-7345')} className={selectedLocation === '작은미술관 보구곶' ? 'selected' : ''}>작은미술관 보구곶</li>
                        <li onClick={() => handleLocationClick('경기 김포시 월곶면 평화공원로 289', '애기봉평화생태공원', '031-989-7492')} className={selectedLocation === '애기봉평화생태공원' ? 'selected' : ''}>애기봉평화생태공원</li>
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