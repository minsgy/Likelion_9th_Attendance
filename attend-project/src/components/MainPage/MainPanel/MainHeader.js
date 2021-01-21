import React from 'react';
import { useSelector } from 'react-redux';

const MainHeader = () => {
    const schedule = useSelector(state => state.schedule.currentSchedule)
    return (
        <div className="MainHeader" style={{ height: '150px' }}>
            <span style={{ margin: 0, fontSize: '15px' }}>{schedule?.year}-{schedule?.month}-{schedule?.day} </span>
            <h2>출석 리스트</h2>
            <h3 style={{ margin: 0, fontSize: '20px' }}>{schedule?.Description}</h3>
        </div>
    );
}

export default MainHeader;
