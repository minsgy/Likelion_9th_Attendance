import React from 'react';
import MainHeader from './MainHeader';
import MainList from './MainList';
import { useSelector } from 'react-redux';


const MainPanel = () => {
    // null일 시, MainHeader 및 MainList 안보이게함.
    const schedule = useSelector(state => state.schedule.currentSchedule)
    return (
        <main style={{ display: 'flex', flexDirection: 'column' }}>
            {schedule ?
                <>
                    <MainHeader />
                    <MainList />
                </>
                :
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                    <h2 style={{
                        backgroundColor: 'grey',
                        padding: '1rem 2rem',
                        fontSize: '25px',
                        color: 'white',
                        borderRadius: '25px'
                    }}>왼쪽 일정 리스트를 선택해주세요!</h2>
                </div>
            }
        </main>
    );
}

export default MainPanel;
