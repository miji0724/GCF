import React, { createContext, useContext, useState } from 'react';
import Online_Post1 from '../../img/ONLINE_POST_1.jpg';
import Online_Post2 from '../../img/ONLINE_POST_2.jpg';
import Online_Post3 from '../../img/ONLINE_POST_3.jpg';
import Online_Post4 from '../../img/ONLINE_POST_4.jpg';
import Online_Post5 from '../../img/ONLINE_POST_5.jpg';
import Online_Post6 from '../../img/ONLINE_POST_6.jpg';
import Online_Post7 from '../../img/ONLINE_POST_7.jpg';
import Online_Movie from '../../img/Online_mp4.mp4';
import Online_etc1 from '../../img/ONLINE_etc_1.jpg';
import Online_etc2 from '../../img/ONLINE_etc_2.jpg';
import Online_etc3 from '../../img/ONLINE_etc_3.jpg';
import Online_etc4 from '../../img/ONLINE_etc_4.jpg';
import Online_etc5 from '../../img/ONLINE_etc_5.jpg';
import Online_TEA1 from '../../img/ONLINE_TEA_1.jpg';
import Online_TEA2 from '../../img/ONLINE_TEA_2.jpg';
import Online_TEA3 from '../../img/ONLINE_TEA_3.jpg';
import Online_TEA4 from '../../img/ONLINE_TEA_4.jpg';
import Online_TEA5 from '../../img/ONLINE_TEA_5.jpg';
import Online_TEA6 from '../../img/ONLINE_TEA_6.jpg';
import Online_TEA7 from '../../img/ONLINE_TEA_7.jpg';

const PostersContext = createContext();

export function usePosters() {
    return useContext(PostersContext);
}

export const Online_posters = ({ children }) => {
    const [On_posters, setPosters] = useState([
        {
            id: 1,
            imageUrl: Online_Post1,
            title: "3D 프린팅",
            dates: "2024-05-2",
            likes: 0,
            views: 300,
            category: "교육",
            moviesrc: Online_Movie,
            '1-1': 0,
            '2-1': 0,
            '2-2': 0,
            '2-3': 0,
            '2-4': 0,
            '2-5': 0,
            '3-1': 0,
            '3-2': 0,
            '3-3': 0,
            '3-4': 0,
            etc: Online_etc1,
            teacher: Online_TEA1
        },

        {
            id: 2,
            imageUrl: Online_Post2,
            title: "콘텐츠 플래닝",
            dates: "2024-05-30",
            likes: 0,
            views: 300,
            category: "기타",
            moviesrc: Online_Movie,
            '1-1': 0,
            '2-1': 0,
            '2-2': 0,
            '2-3': 0,
            '2-4': 0,
            '2-5': 0,
            '3-1': 0,
            '3-2': 0,
            '3-3': 0,
            '3-4': 0,
            etc: Online_etc2,
            teacher: Online_TEA2
        },

        {
            id: 3,
            imageUrl: Online_Post3,
            title: "콘텐트 디자인",
            dates: "2024-05-1",
            likes: 0,
            views: 300,
            category: "디자인",
            moviesrc: Online_Movie,
            '1-1': 0,
            '2-1': 0,
            '2-2': 0,
            '2-3': 0,
            '2-4': 0,
            '2-5': 0,
            '3-1': 0,
            '3-2': 0,
            '3-3': 0,
            '3-4': 0,
            etc: Online_etc3,
            teacher: Online_TEA3
        },

        {
            id: 4,
            imageUrl: Online_Post4,
            title: "일러스트 드로잉",
            dates: "2024-05-15",
            likes: 0,
            views: 300,
            category: "미술",
            moviesrc: Online_Movie,
            '1-1': 0,
            '2-1': 0,
            '2-2': 0,
            '2-3': 0,
            '2-4': 0,
            '2-5': 0,
            '3-1': 0,
            '3-2': 0,
            '3-3': 0,
            '3-4': 0,
            etc: Online_etc4,
            teacher: Online_TEA4
        },

        {
            id: 5,
            imageUrl: Online_Post5,
            title: "영상제작",
            dates: "2024-05-10",
            likes: 0,
            views: 300,
            category: "디자인",
            moviesrc: Online_Movie,
            '1-1': 0,
            '2-1': 0,
            '2-2': 0,
            '2-3': 0,
            '2-4': 0,
            '2-5': 0,
            '3-1': 0,
            '3-2': 0,
            '3-3': 0,
            '3-4': 0,
            etc: Online_etc5,
            teacher: Online_TEA5
        },

        {
            id: 6,
            imageUrl : Online_Post6,
            title: "아인슈타인의 과학 강의",
            dates: "1915-11-25",
            likes : 10,
            views : 1900,
            category: "과학",
            moviesrc: Online_Movie,
            '1-1': 0,
            '2-1': 0,
            '2-2': 0,
            '2-3': 0,
            '2-4': 0,
            '2-5': 0,
            '3-1': 0,
            '3-2': 0,
            '3-3': 0,
            '3-4': 0,
            etc: Online_etc1,
            teacher: Online_TEA6
        },

        {
            id: 7,
            imageUrl : Online_Post7,
            title: "오베 안스네스;베토벤 강의",
            dates: "2015-01-25",
            likes : 5,
            views : 190,
            category: "음악",
            moviesrc: Online_Movie,
            '1-1': 0,
            '2-1': 0,
            '2-2': 0,
            '2-3': 0,
            '2-4': 0,
            '2-5': 0,
            '3-1': 0,
            '3-2': 0,
            '3-3': 0,
            '3-4': 0,
            etc: Online_etc2,
            teacher: Online_TEA7
        }
    ]);  // 포스터 데이터 초기화

    return (
        <PostersContext.Provider value={{On_posters, setPosters }}>
            {children}
        </PostersContext.Provider>
    );
};