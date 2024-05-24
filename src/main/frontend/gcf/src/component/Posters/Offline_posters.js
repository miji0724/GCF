import React, { createContext, useContext, useState } from 'react';
import POSTER1 from '../../img/OFFLINE_POST_1.jpg';
import POSTER2 from '../../img/OFFLINE_POST_2.jpg';
import POSTER3 from '../../img/OFFLINE_POST_3.jpg';
import POSTER4 from '../../img/OFFLINE_POST_4.jpg';
import POSTER5 from '../../img/OFFLINE_POST_5.jpg';
import POSTER1_INFO from '../../img/off_info 1.jpg';
import POSTER2_INFO from '../../img/off_info 2.jpg';
import POSTER3_INFO from '../../img/off_info 3.jpg';
import POSTER4_INFO from '../../img/off_info 4.jpg';
import POSTER5_INFO from '../../img/off_info 5.jpg';




const PostersContext = createContext();

export function usePosters() {
    return useContext(PostersContext);
}

// 추후 백엔드시 삭제 
export const Offline_posters = ({ children }) => {
    const [posters, setPosters] = useState([
        {
            id: 1,
            imageUrl: POSTER1,
            title: "2024 한옥마을 교육프로그램 <모담골 노는 학당> 1~3기 모집",
            posterStatus: "접수중",
            DUPLICATE_REGISTRATION: "O",
            dates: "2024-05-10 ~ 2024-07-26",
            location: "김포아트빌리지 한옥마을",
            likes: 0,
            isBookmarked: false,
            views: 300,
            category: "교육",
            day_of_week: "매주 금",
            recruitment: "2024-04-29 ~ 2024-05-31 ",
            inquiry: "031-999-3992",
            fee: "무료",
            participants: "60",
            target: "어린이",
            time: "16:00~17:30",
            etc: POSTER1_INFO
        },

        {
            id: 2,
            imageUrl: POSTER2,
            title: "[작은미술관 보구곶] 봄전시 연계 프로그램 <향기롭던 보구곶의 봄>",
            posterStatus: "접수중",
            DUPLICATE_REGISTRATION: "O",
            dates: "2024-05-11 ~ 2024-06-22",
            location: "작은미술관 보구곶",
            likes: 0,
            isBookmarked: false,
            views: 300,
            category: "체험",
            day_of_week: "매주 토",
            recruitment: "2024-04-29 ~ 2024-05-31 ",
            inquiry: "031-999-3973",
            fee: "5,000원",
            participants: "30",
            target: "어른",
            time: "14:00~16:00",
            etc: POSTER2_INFO
        },

        {
            id: 3,
            imageUrl: POSTER3,
            title: "2024 월곶생활문화센터 문화예술프로그램 수강생 모집(5월~8월)",
            posterStatus: "접수중",
            DUPLICATE_REGISTRATION: "X",
            dates: "2024-04-15 ~ 2024-11-30",
            location: "월곶생활문화센터",
            likes: 0,
            isBookmarked: false,
            views: 300,
            category: "교육",
            day_of_week: "프로그램별 상이",
            recruitment: "2024-04-15 ~ 2024-11-30마감 시",
            inquiry: "031-999-3992",
            fee: "프로그램별 상이",
            participants: "14",
            target: "어른",
            time: "프로그램별 상이",
            etc: POSTER3_INFO
        },

        {
            id: 4,
            imageUrl: POSTER4,
            title: "2024 김포아트빌리지 기획전시 <들여다보기>展 전시연계교육프로그램 - 모두 꽃이 될 수 있다",
            posterStatus: "접수마감",
            DUPLICATE_REGISTRATION: "X",
            dates: "2024-04-29 ~ 2024-05-01",
            location: "김포아트빌리지 한옥마을",
            likes: 0,
            isBookmarked: false,
            views: 300,
            category: "체험",
            day_of_week: "매주 일",
            recruitment: "2024-04-29 ~ 2024-05-01",
            inquiry: "031-999-3992",
            fee: "무료",
            participants: "30",
            target: "어린이",
            time: "16:00~17:30",
            etc: POSTER4_INFO
        },

        {
            id: 5,
            imageUrl: POSTER5,
            title: "월곶생활문화센터 '문화가 있는 토요일' 5월 11일 참여자 모집",
            posterStatus: "준비중",
            DUPLICATE_REGISTRATION: "O",
            dates: "2024-05-10 ~ 2024-05-12",
            location: "김포아트빌리지 한옥마을",
            likes: 0,
            isBookmarked: false,
            views: 300,
            category: "체험",
            day_of_week: "미정",
            recruitment: "미정",
            inquiry: "031-999-3992",
            fee: "무료",
            participants: "미정",
            target: "어른",
            time: "미정",
            etc: POSTER5_INFO
        },

        {
            id: 6,
            imageUrl: POSTER1,
            title: "2024 한옥마을 교육프로그램 <모담골 노는 학당> 1~3기 모집",
            posterStatus: "접수중",
            DUPLICATE_REGISTRATION: "O",
            dates: "2024-05-10 ~ 2024-07-26",
            location: "김포아트빌리지 한옥마을",
            likes: 0,
            isBookmarked: false,
            views: 300,
            category: "교육",
            day_of_week: "매주 금",
            recruitment: "2024-04-29 ~ 2024-05-31 ",
            inquiry: "031-999-3992",
            fee: "무료",
            participants: "60",
            target: "어린이",
            time: "16:00~17:30",
            etc: POSTER1_INFO

        },

        {
            id: 7,
            imageUrl: POSTER2,
            title: "[작은미술관 보구곶] 봄전시 연계 프로그램 <향기롭던 보구곶의 봄>",
            posterStatus: "접수중",
            DUPLICATE_REGISTRATION: "O",
            dates: "2024-05-11 ~ 2024-06-22",
            location: "작은미술관 보구곶",
            likes: 0,
            isBookmarked: false,
            views: 300,
            category: "체험",
            day_of_week: "매주 토",
            recruitment: "2024-04-29 ~ 2024-05-31 ",
            inquiry: "031-999-3973",
            fee: "5,000원",
            participants: "30",
            target: "어른",
            time: "14:00~16:00",
            etc: POSTER2_INFO
        },

        {
            id: 8,
            imageUrl: POSTER3,
            title: "2024 월곶생활문화센터 문화예술프로그램 수강생 모집(5월~8월)",
            posterStatus: "접수중",
            DUPLICATE_REGISTRATION: "O",
            dates: "2024-04-15 ~ 2024-11-30",
            location: "월곶생활문화센터",
            likes: 0,
            isBookmarked: false,
            views: 300,
            category: "교육",
            day_of_week: "매주 목",
            recruitment: "2024-04-15 ~ 2024-11-30마감 시",
            inquiry: "031-999-3992",
            fee: "프로그램별 상이",
            participants: "14",
            target: "어른",
            time: "프로그램별 상이",
            etc: POSTER3_INFO
        },

        {
            id: 9,
            imageUrl: POSTER4,
            title: "2024 김포아트빌리지 기획전시 <들여다보기>展 전시연계교육프로그램 - 모두 꽃이 될 수 있다",
            posterStatus: "접수마감",
            DUPLICATE_REGISTRATION: "O",
            dates: "2024-04-29 ~ 2024-05-01",
            location: "김포아트빌리지 한옥마을",
            likes: 0,
            isBookmarked: false,
            views: 300,
            category: "체험",
            day_of_week: "매주 일",
            recruitment: "2024-04-29 ~ 2024-05-01",
            inquiry: "031-999-3992",
            fee: "무료",
            participants: "30",
            target: "어린이",
            time: "16:00~17:30",
            etc: POSTER4_INFO
        },

        {
            id: 10,
            imageUrl: POSTER5,
            title: "월곶생활문화센터 '문화가 있는 토요일' 5월 11일 참여자 모집",
            posterStatus: "준비중",
            DUPLICATE_REGISTRATION: "O",
            dates: "2024-05-10 ~ 2024-05-12",
            location: "김포아트빌리지 한옥마을",
            likes: 0,
            isBookmarked: false,
            views: 300,
            category: "체험",
            day_of_week: "미정",
            recruitment: "미정",
            inquiry: "031-999-3992",
            fee: "무료",
            participants: "미정",
            target: "어른",
            time: "미정",
            etc: POSTER5_INFO
        },

        {
            id: 11,
            imageUrl: POSTER1,
            title: "2024 한옥마을 교육프로그램 <모담골 노는 학당> 1~3기 모집",
            posterStatus: "접수중",
            DUPLICATE_REGISTRATION: "O",
            dates: "2024-05-10 ~ 2024-07-26",
            location: "김포아트빌리지 한옥마을",
            likes: 0,
            isBookmarked: false,
            views: 300,
            category: "교육",
            day_of_week: "매주 금",
            recruitment: "2024-04-29 ~ 2024-05-31 ",
            inquiry: "031-999-3992",
            fee: "무료",
            participants: "60",
            target: "어린이",
            time: "16:00~17:30",
            etc: POSTER1_INFO
        },

        {
            id: 12,
            imageUrl: POSTER1,
            title: "2024 한옥마을 교육프로그램 <모담골 노는 학당> 1~3기 모집",
            posterStatus: "접수중",
            DUPLICATE_REGISTRATION: "X",
            dates: "2024-05-10 ~ 2024-07-26",
            location: "김포아트빌리지 한옥마을",
            likes: 0,
            isBookmarked: false,
            views: 300,
            category: "교육",
            day_of_week: "매주 금",
            recruitment: "2024-04-29 ~ 2024-05-31 ",
            inquiry: "031-999-3992",
            fee: "무료",
            participants: "60",
            target: "어린이",
            time: "16:00~17:30",
            etc: POSTER1_INFO
        },
    ]);  // 포스터 데이터 초기화

    return (
        <PostersContext.Provider value={{ posters, setPosters }}>
            {children}
        </PostersContext.Provider>
    );
};