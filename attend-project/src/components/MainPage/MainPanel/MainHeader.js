import React from 'react';
import { useSelector } from 'react-redux';

const MainHeader = () => {
    const schedule = useSelector(state => state.schedule.currentSchedule)
    return (
        <div className="MainHeader">
            <span style={{ margin: 0, fontSize: '25px' }}>{schedule?.Datetime} </span>
            <h3 style={{ margin: 0, fontSize: '25px' }}>{schedule?.Description}</h3>
        </div>
    );
}

export default MainHeader;
