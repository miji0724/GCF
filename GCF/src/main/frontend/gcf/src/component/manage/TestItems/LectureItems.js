const items = [
    { lecture_id: 1, lecture_name: '김자바', lecture_title: '누구나 할 수 있는 음악', lecture_type: '온라인', lecture_category: '음악', lecture_lecRegistDate: '2024-05-10' },
    { lecture_id: 2, lecture_name: '이자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-09' },
    { lecture_id: 3, lecture_name: '박자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-08' },
    { lecture_id: 4, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 5, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 6, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 7, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 8, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 9, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 10, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 11, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 12, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 13, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 14, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 1, lecture_name: '김자바', lecture_title: '누구나 할 수 있는 음악', lecture_type: '온라인', lecture_category: '음악', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 2, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 3, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 4, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 5, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 6, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 7, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 8, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 9, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 10, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 11, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 12, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 13, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 14, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 1, lecture_name: '김자바', lecture_title: '누구나 할 수 있는 음악', lecture_type: '온라인', lecture_category: '음악', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 2, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 3, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 4, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 5, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 6, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 7, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 8, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 9, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 10, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 11, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 12, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 13, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 14, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 1, lecture_name: '김자바', lecture_title: '누구나 할 수 있는 음악', lecture_type: '온라인', lecture_category: '음악', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 2, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 3, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 4, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 5, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 6, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 7, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 8, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 9, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 10, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 11, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 12, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 13, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 14, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 1, lecture_name: '김자바', lecture_title: '누구나 할 수 있는 음악', lecture_type: '온라인', lecture_category: '음악', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 2, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 3, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 4, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 5, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 6, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 7, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 8, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 9, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 10, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 11, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 12, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 13, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 14, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 1, lecture_name: '김자바', lecture_title: '누구나 할 수 있는 음악', lecture_type: '온라인', lecture_category: '음악', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 2, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 3, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 4, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 5, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 6, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 7, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 8, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 9, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 10, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 11, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 12, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 13, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 14, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 1, lecture_name: '김자바', lecture_title: '누구나 할 수 있는 음악', lecture_type: '온라인', lecture_category: '음악', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 2, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 3, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 4, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 5, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 6, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 7, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 8, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 9, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 10, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 11, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 12, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 13, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 14, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 1, lecture_name: '김자바', lecture_title: '누구나 할 수 있는 음악', lecture_type: '온라인', lecture_category: '음악', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 2, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 3, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 4, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 5, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 6, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 7, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 8, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 9, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 10, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 11, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 12, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 13, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 14, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 1, lecture_name: '김자바', lecture_title: '누구나 할 수 있는 음악', lecture_type: '온라인', lecture_category: '음악', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 2, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' },
    { lecture_id: 3, lecture_name: '김자바', lecture_title: '김포에서 열리는 교육', lecture_type: '오프라인', lecture_category: '교육', lecture_lecRegistDate: '2024-05-07' }
];
export default items;