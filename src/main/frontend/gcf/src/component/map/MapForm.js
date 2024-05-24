import React, { useRef, useEffect, useState } from 'react';
import './MapForm.css';

const MapForm = ({ locationName }) => {
    const mapRef = useRef(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [location, setLocation] = useState(null);
    const [tel, setTel] = useState(null);
    const [parkingInfo, setParkingInfo] = useState(null);
    const [subwayInfo, setSubwayInfo] = useState(null);
    const [busInfo, setBusInfo] = useState(null);

    const locations = {
    '김포아트홀': { 
        address: '경기 김포시 돌문로 26', 
        tel: '031-996-1605', 
        parking: '김포아트홀 지하 1~2층 총 60대(장애인 2대, 전기차충전기 2대 포함)\n※ 주차공간이 협소하므로 가급적 대중교통 이용 바람\n- 07:00~22:00, 연중무휴'
            + '\n\n※ 주차요금'
            + '\n- 기본(30분) 600원, 2시간 이내(10분 기준) 200원, 2시간 초과(10분 기준) 400원, 1일 6000원'
            + '\n\n- 공연관람 및 행사차량 : 당일 2,000원'
            + '\n- 1,000cc이하 경소형 승용차 : 50%할인'
            + '\n- 요일제 운행차량, 승용차 함께 타기 참여차량 : 20%할인'
            + '\n- 장애인으로서 차량에 장애인 표지를 부착 또는 장애인 등록증을 소지한 자로서 직접 운전하는 차량이나 장애 정도가 심하여 본인이 직접 운전할 수 없는 경우 : 최초 2시간 면제 후 2시간 초과분 50%할인'
            + '\n- 국가유공자 본인 소유의 비사업용 승용차, 고엽제후유증 환자가 국가보훈처장이 발급한 표지 부착한 차량 :'
            + '최초 2시간 면제, 2시간 초과분 50%할인'
            + '\n- 성실납세(스티커부착)차량, 관용차량, 긴급 동원차량 : 면제', 
        subway: '김포 골드라인 사우역 3번 출구에서 도보 3분', 
        bus: '사우고등학교 하차 후 공설운동장 방면 100m'
            + '\n\n- 시내버스 (2, 9-1, 60, 60-3, 81, 81-1, 83, 88, 95, 96, 101, 102, 388, 841, 841-1)\n- 직행버스(3000, 8600, 9008)\n- 시외버스(9502, 8426)\n- 광역버스(9501)\n- 간선버스(17, 60-2, 672)\n- 지선버스(6641)\n- 마을버스(52,53,55,15,1)'
    },
        '김포아트빌리지 한옥마을': { 
            address: '경기 김포시 모담공원로 170-7', 
            tel: '031-999-3995', 
            parking: '총 144대(일반 120대, 경차 10대, 노약자 14대)'
                + '\n- 24시간, 연중무휴'
                + '\n\n※ 주차요금'
                + '\n- 기본(30분) 600원, 1시간 1500원, 2시간 3300원, 1일 7000원, 10분 추가 300원'
                + '\n\n- 소형승용차(배기량 1,000시시 이하), 저공해자동차 (자동차 외부에 저공해 자동차 표지가 부착되어 식별이 가능한 차량에 한함), 경기아이플러스 카드 제시, 임산부 탑승차량(임산부 증명자료), 김포시 병역 명문가 예우대상자 및 가족, 경로우대(만65세 이상) : 50% 감면'
                + '\n- 승용차 요일제 운영, 함께 타기 참여 차량 : 20% 감면'
                + '\n- 장애인차량 (등록증 소지한 자로서 직접운전하는 차량이나 직접 운전할 수 없는 경우 타인으로 하여금 대리운전하게 하는 차량), 국가보훈예우 대상자의 비사업용 승용차(상이정도가 심하여 직접 운전할 수 없는 경우 타인으로 하여금 대리운전하게 하는 차량)'
                + '고엽제후유의증 환자(국가보훈처장이 발급한 표지) : 최초 2시간 무료, 2시간 초과분 50%감면'
                + '\n- 우수자원봉사자 (경기도자원봉사센터에서 발행한 우수자원봉사자증을 소지하고 본인이 직업 운전하는 차량) : 최초 4시간 무료, 2시간 초과분 50% 감면'
                + '\n- 전기자동차(충천할 경우) : 2시간 무료'
                + '\n- 경기도 유공납세자 (인증서 소지) : 1년간 주차요금 면제'
                + '\n- 자전거(이륜차), 3자녀 이상 가구(김포시민), 중소기업대상으로 선정된 차량(1년), 중소기업별 2대, 모범바원 봉사자(김포시장이 발행한 증서소지) : 면제'
                ,
            subway: '버스 및 자차 이용', 
            bus: '- 운양역 3번 출구 버스정류장에서 8번 버스 승차 후 화성파크드림.KCC스위첸 하차'
                + '\n- 운양역 2번 출구 버스정류장에서 한강이음1번 버스 승차 후 화성파크드림.KCC스위첸 하차'
                + '\n\n 서울에서 이용시'
                + '\n- 7100, 8600, 8601, 8000, G6004 버스 승차 후 화성파크드림.KCC스위첸 하차'
                + '\n한옥마을 버스정류장에서 도보 2분'
                + '\n- 일반버스(388, 81-1)'
                + '\n- 직행버스(7100)'
        },
        '김포아트빌리지': { 
            address: '경기 김포시 모담공원로 170', 
            tel: '031-999-3995', 
            parking: '총 144대(일반 120대, 경차 10대, 노약자 14대)'
                + '\n- 24시간, 연중무휴'
                + '\n\n※ 주차요금'
                + '\n- 기본(30분) 600원, 1시간 1500원, 2시간 3300원, 1일 7000원, 10분 추가 300원'
                + '\n\n- 소형승용차(배기량 1,000시시 이하), 저공해자동차 (자동차 외부에 저공해 자동차 표지가 부착되어 식별이 가능한 차량에 한함), 경기아이플러스 카드 제시, 임산부 탑승차량(임산부 증명자료), 김포시 병역 명문가 예우대상자 및 가족, 경로우대(만65세 이상) : 50% 감면'
                + '\n- 승용차 요일제 운영, 함께 타기 참여 차량 : 20% 감면'
                + '\n- 장애인차량 (등록증 소지한 자로서 직접운전하는 차량이나 직접 운전할 수 없는 경우 타인으로 하여금 대리운전하게 하는 차량), 국가보훈예우 대상자의 비사업용 승용차(상이정도가 심하여 직접 운전할 수 없는 경우 타인으로 하여금 대리운전하게 하는 차량)'
                + '고엽제후유의증 환자(국가보훈처장이 발급한 표지) : 최초 2시간 무료, 2시간 초과분 50%감면'
                + '\n- 우수자원봉사자 (경기도자원봉사센터에서 발행한 우수자원봉사자증을 소지하고 본인이 직업 운전하는 차량) : 최초 4시간 무료, 2시간 초과분 50% 감면'
                + '\n- 전기자동차(충천할 경우) : 2시간 무료'
                + '\n- 경기도 유공납세자 (인증서 소지) : 1년간 주차요금 면제'
                + '\n- 자전거(이륜차), 3자녀 이상 가구(김포시민), 중소기업대상으로 선정된 차량(1년), 중소기업별 2대, 모범바원 봉사자(김포시장이 발행한 증서소지) : 면제'
                ,
            subway: '버스 및 자차 이용', 
            bus: '- 운양역 3번 출구 버스정류장에서 8번 버스 승차 후 화성파크드림.KCC스위첸 하차'
                + '\n- 운양역 2번 출구 버스정류장에서 한강이음1번 버스 승차 후 화성파크드림.KCC스위첸 하차'
                + '\n\n 서울에서 이용시'
                + '\n- 7100, 8600, 8601, 8000, G6004 버스 승차 후 화성파크드림.KCC스위첸 하차'
                + '\n한옥마을 버스정류장에서 도보 1분'
                + '\n- 일반버스(388, 81-1)'
                + '\n- 직행버스(7100)'
        },
        '통진두레 문화센터': { 
            address: '경기 김포시 통진읍 김포대로 2347-8', 
            tel: '031-999-3982', 
            parking: '총 32대 주차 가능 (379.5㎡), 09:00-18:00 무료개방(공연일 주차장 운영시간은 변동될 수 있습니다.)', 
            subway: '버스 및 자차 이용', 
            bus: '시내버스(88, 90, 96, 97), 통진두레문화센터(구 청룡사입구) 하차' 
        },
        '김포국제조각공원': { 
            address: '경기 김포시 월곶면 고막리 435-14', 
            tel: '031-999-3985', 
            parking: '소형차 1000원, 중형차 1500원, 대형차 2000원', 
            subway: '버스 및 자차 이용',
            bus: '시내버스(88, 96, 97), 조각공원·청소년수련원 정류장 하차' 
        },
        '월곶생활문화센터': { 
            address: '경기 김포시 월곶면 군하로276번길 20', 
            tel: '031-999-3986', 
            parking: '주차대수 35대(장애인 1대, 일반주차 34대), 개방형 무료주차', 
            subway: '버스 및 자차 이용',
            bus: '군하리 한우마을 정류장 하차 후 도보 5분' 
                + '\n- 일반버스 (88, 96, 101, 102)' 
                + '\n- 직행버스(3000)'
        },
        '김포평화문화관': { 
            address: '경기 김포시 월곶면 용강로13번길 38 김포평화문화관', 
            tel: '031-999-3987', 
            parking: '소형차 1000원, 중형차 1500원, 대형차 2000원', 
            subway: '버스 및 자차 이용', 
            bus: '- 일반버스 (88, 96, 101, 102) 조각공원 입구, 청소년 수련원 정류장 하차'
                + '\n- 직행버스(3000) 군하리 한우마을 정류장 하차' 
        },
        '작은미술관 보구곶': {
            address: '경기 김포시 월곶면 문수산로 373', 
            tel: '031-982-7345', 
            parking: '주변 주차', 
            subway: '버스 및 자차 이용', 
            bus: '마을버스(11A, 11B) 보구곶리 정류장 하차 후 도보 5분' 
        },
        '애기봉평화생태공원': { 
            address: '경기 김포시 월곶면 평화공원로 289', 
            tel: '031-989-7492', 
            parking: '주변 주차',
            subway: '버스 및 자차 이용', 
            bus: '- 영등포(88번), 신촌(3000번), 일산(80, 96, 97번), 인천(70번) : 군하리 하차 => 택시(10분 소요)'
            + '\n- 김포(1-1번(주말), 7-2번(주말), 7번, 101번 : 애기봉 입구 하차 => 택시(10분 소요)' 
        },
    };

    const moveMapToAddress = (address, parking, subway, bus) => {
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

        setLocation(address);
        setTel(tel);
        setParkingInfo(parking);
        setSubwayInfo(subway);
        setBusInfo(bus);
    };

    useEffect(() => {
        if (locationName && locations[locationName]) {
            const { address, tel, parking, subway, bus } = locations[locationName];
            moveMapToAddress(address, parking, subway, bus);
            setSelectedLocation(locationName);
            setLocation(address);
            setTel(tel);
            setParkingInfo(parking);
            setSubwayInfo(subway);
            setBusInfo(bus);
        }
    }, [locationName]);

    const handleLocationClick = (location, locationName, tel, parking, subway, bus) => {
        moveMapToAddress(location, parking, subway, bus);
        setSelectedLocation(locationName);
        setLocation(location);
        setTel(tel);
        setParkingInfo(parking);
        setSubwayInfo(subway);
        setBusInfo(bus);
    };

    return (
        <div className="map_form">
            <div className="title">위치</div>
            <div className="line"></div>
            <div className="map_body">
                <div className="map_sidebar">
                    <ul>
                        {Object.entries(locations).map(([name, { address, tel, parking, subway, bus }]) => (
                            <li
                                key={name}
                                onClick={() => handleLocationClick(address, name, tel, parking, subway, bus)}
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
                        <div id="traffic_contents">{parkingInfo}</div>
                    </div>
                    <div className="subway">
                        <div id="map_traffic_title">지하철</div>
                        <div id="traffic_contents">{subwayInfo}</div>
                    </div>
                    <div className="bus">
                        <div id="map_traffic_title">버스</div>
                        <div id="traffic_contents">{busInfo}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MapForm;