import React, { useState } from 'react';
import MainHeader from './MainHeader';
import MainList from './MainList';
import { useSelector } from 'react-redux';
import firebase from '../../../firebase'
import renderEmpty from 'antd/lib/config-provider/renderEmpty';
import AttendList from './AttendList';


const MainPanel = () => {

    // const [AttendanceRef, setAttendanceRef] = useState(firebase.database().ref("Attendance"))
    // const [UserRef, setUserRef] = useState(firebase.database().ref("Users"))
    // const [UserRef, setUserRef] = useState(firebase.database().ref("Users"))

    // null일 시, MainHeader 및 MainList 안보이게함.
    const schedule = useSelector(state => state.schedule.currentSchedule)


    // const AttendanceList

    return (
        <main style={{ display: 'flex', flexDirection: 'column' }}>
            {schedule ?
                <>
                    <MainHeader />
                    <MainList />
                </>
                :
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <AttendList />
                </div>
            }
        </main>
    );
}

export default MainPanel;
