import './ScheduleForm.css';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/ko';

const ScheduleForm = () => {
    const [currentMonth, setCurrentMonth] = useState(moment());
    const [selectedDate, setSelectedDate] = useState(moment());

    useEffect(() => {
        setCurrentMonth(selectedDate.clone());
    }, [selectedDate]);

    const handleYearChange = (e) => {
        const year = parseInt(e.target.value);
        setSelectedDate(selectedDate.clone().year(year));
    };

    const handleMonthChange = (e) => {
        const month = parseInt(e.target.value);
        setSelectedDate(selectedDate.clone().month(month));
    };

    const handlePrevMonth = () => {
        const newSelectedDate = selectedDate.clone().subtract(1, 'month');
        setSelectedDate(newSelectedDate);
        setCurrentMonth(newSelectedDate);
    };

    const handleNextMonth = () => {
        const newSelectedDate = selectedDate.clone().add(1, 'month');
        setSelectedDate(newSelectedDate);
        setCurrentMonth(newSelectedDate);
    };

    const renderHeader = () => {
        return (
            <div className="header">
                <button onClick={handlePrevMonth} className='sche_button'>{'<'}</button>
                <select value={selectedDate.year()} onChange={handleYearChange} className="sche-dropdown">
                    {[...Array(10).keys()].map((offset) => (
                        <option key={offset} value={moment().add(offset, 'year').year()}>
                            {moment().add(offset, 'year').year()}
                        </option>
                    ))}
                </select>
                <select value={selectedDate.month()} onChange={handleMonthChange}>
                    {moment.months().map((month, index) => (
                        <option key={index} value={index}>
                            {month}
                        </option>
                    ))}
                </select>
                <button onClick={handleNextMonth} className='sche_button'>{'>'}</button>
            </div>
        );
    };


    const renderDays = () => {
        const days = [];
        let startDate = currentMonth.clone().startOf('month').startOf('week');
        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="day" key={i}>
                    {startDate.format('ddd')}
                </div>
            );
            startDate.add(1, 'day');
        }
        return <div className="days">{days}</div>;
    };

    const renderCells = () => {
        const monthStart = currentMonth.clone().startOf('month');
        const monthEnd = currentMonth.clone().endOf('month');
        const startDate = monthStart.clone().startOf('week');
        const endDate = monthEnd.clone().endOf('week');
        const rows = [];

        let days = startDate.clone();
        while (days.isSameOrBefore(endDate, 'day')) {
            let daysInWeek = [];
            for (let i = 0; i < 7; i++) {
                const date = days.clone();
                if (date.isSame(monthStart, 'month')) { // 현재 달의 날짜만 렌더링
                    daysInWeek.push(
                        <div
                            className={`day ${date.isSame(selectedDate, 'day') ? 'selected' : ''}`} // 선택된 날짜 스타일 적용
                            key={date.toString()}
                            onClick={() => handleDateClick(date)} // 날짜 클릭 핸들러 추가
                        >
                            {days.format('D')}
                        </div>
                    );
                } else {
                    daysInWeek.push(
                        <div className="day empty" key={date.toString()}></div> // 이전 달의 날짜는 비워둠
                    );
                }
                days.add(1, 'day');
            }
            rows.push(
                <div className="row" key={days.toString()}>
                    {daysInWeek}
                </div>
            );
        }
        return <div className="body">{rows}</div>;
    };

    const handleDateClick = (date) => {
        setSelectedDate(date); // 클릭한 날짜 업데이트
    };

    return (
        <div className="schedule_form">
            <div className="title">이달의 일정</div>
            <div className="line"></div>
            <div className="schedule_body">
                <div className="monthly_schedule_calendar">
                    <div className="calendar">
                        <div id="calendar_header">
                            {renderHeader()}
                        </div>
                        <div id="calendar_body">
                            {renderDays()}
                            {renderCells()}
                        </div>
                    </div>
                </div>
                <div className="monthly_program">
                    <div className="date_program">
                        {selectedDate.format('YYYY-MM-DD')}
                    </div>
                    <div className="program_posters"></div>
                </div>
            </div>
        </div>
    );
}

export default ScheduleForm;