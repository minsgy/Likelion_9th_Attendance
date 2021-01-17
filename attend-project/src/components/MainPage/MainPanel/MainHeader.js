import React from 'react';
import { useSelector } from 'react-redux';

const MainHeader = () => {
    const schedule = useSelector(state => state.schedule.currentSchedule)
    return (
        <div className="MainHeader">
            {schedule.Datetime} {schedule.Description}
        </div>
    );
}

export default MainHeader;
