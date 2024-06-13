import './ScheduleForm.css';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import axios from 'axios';

const ScheduleForm = () => {
    const [currentMonth, setCurrentMonth] = useState(moment());
    const [selectedDate, setSelectedDate] = useState(moment());

    const [offProgramsSchedule, setOffProgramsSchedule] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/schedule/getOffProgram');
                setOffProgramsSchedule(response.data);
                setDataLoaded(true);
            } catch (error) {
                console.error('Failed to fetch data', error);
                alert('데이터를 가져오는데 실패했습니다.');
            }
        };
        fetchData();
    }, []);

    const renderHeader = () => {
        return (
            <div className="header">
                <button onClick={handlePrevMonth} className='sche_button'>{'<'}</button>
                <select value={selectedDate.year()} onChange={handleYearChange} className="sche-dropdown">
                    {[...Array(10).keys()].map((offset) => (
                        <option key={offset} value={moment().year() - 5 + offset}>
                            {moment().year() - 5 + offset}
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
                if (date.isSame(monthStart, 'month')) { 
                    const offlineCategories = getOfflineCategories(date);
                    const uniqueCategories = Array.from(new Set(offlineCategories)); // 중복 카테고리 제거
    
                    daysInWeek.push(
                        <div
                            className={`day ${date.isSame(selectedDate, 'day') ? 'selectedDay' : ''}`} 
                            key={date.toString()}
                            onClick={() => handleDateClick(date)} 
                        >
                            {days.format('D')}
                            <div className="off_type_mark">
                                {uniqueCategories && uniqueCategories.map((category, index) => (
                                    <div key={index} className={`off_${category}`}>
                                        {category}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                } else {
                    daysInWeek.push(
                        <div className="day empty" key={date.toString()}></div>
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
    
    const getOfflineCategories = (date) => {
        const programs = offProgramsSchedule.filter(program => {
            const startDay = moment(program.operatingStartDay.join('-'), 'YYYY-MM-DD');
            const endDay = moment(program.operatingEndDay.join('-'), 'YYYY-MM-DD');

            return date.isSameOrAfter(startDay) && date.isSameOrBefore(endDay);
        });

        if (programs.length > 0) {
            return programs.map(program => program.category);
        } else {
            return null;
        }
    };

    const getProgramsForDate = (date) => {
        return offProgramsSchedule.filter(program => {
            const startDay = moment(program.operatingStartDay.join('-'), 'YYYY-MM-DD');
            const endDay = moment(program.operatingEndDay.join('-'), 'YYYY-MM-DD');
    
            return date.isSameOrAfter(startDay) && date.isSameOrBefore(endDay);
        });
    };
    

    const renderProgramsForDate = (date) => {
        const programs = getProgramsForDate(date); // 해당 날짜의 프로그램을 가져옵니다.
    
        if (programs.length > 0) {
            // 카테고리별로 프로그램을 분류합니다.
            const categorizedPrograms = {};
            programs.forEach(program => {
                if (!categorizedPrograms[program.category]) {
                    categorizedPrograms[program.category] = [];
                }
                categorizedPrograms[program.category].push(program);
            });
    
            // 카테고리별로 슬라이더 렌더링
            return Object.keys(categorizedPrograms).map(category => (
                <div key={category} className={`category_programs_${category}`}>
                    <h3>{category}</h3>
                    <div className="programs-slider" style={{ overflowX: 'auto' }}>
                        {/* 프로그램 포스터 슬라이드 */}
                        <div className="slider-wrapper" style={{ display: 'flex' }}>
                            {categorizedPrograms[category].map((program, index) => (
                                <a key={index} className="program_poster" href={`/offlineList/detail/${program.programName}`} style={{ marginRight: '10px' }}>
                                    <img src={program.poster.file_path} alt={program.title} />
                                    <div className="offProgram_info_schedule">
                                        <div className="schedule_place">[{program.programName.length > 33 ? program.programName.substring(0, 33) + '...' : program.programName}]</div>
                                        <div>📍 {program.placeName}</div><br />
                                        <div>📆 {moment(program.operatingStartDay.join('-'), 'YYYY-MM-DD').format('YYYY-MM-DD')} <br />&nbsp;&nbsp; ~ {moment(program.operatingEndDay.join('-'), 'YYYY-MM-DD').format('YYYY-MM-DD')}</div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            ));
        } else {
            return (
                <div>해당 날짜에는 프로그램이 존재하지 않습니다.</div>
            );
        }
    };
    const handleDateClick = (date) => {
        setSelectedDate(date);
        renderProgramsForDate(date); // 클릭한 날짜의 프로그램을 보여줌
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
                    <div className="program_posters">
                        {renderProgramsForDate(selectedDate)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ScheduleForm;
