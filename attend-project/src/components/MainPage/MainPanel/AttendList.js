import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import firebase from '../../../firebase';
import Table from 'react-bootstrap/Table';

const AttendList = () => {
    // 데이터베이스 ref
    const [AttendanceRef, setAttendanceRef] = useState(firebase.database().ref("Attendance"))
    const [UserRef, setUserRef] = useState(firebase.database().ref("Users"))
    const [ScheduleRef, setScheduleRef] = useState(firebase.database().ref("Schedule"))

    const [Schedule, setSchedule] = useState([]);
    const [User, setUser] = useState([]);
    const [Attendance, setAttendance] = useState([]);

    const [Absent, setAbsent] = useState(0);
    let count = 0;

    const addUserListeners = async () => {
        let UsersArray = [];
        await UserRef.on('child_added', DataSnapshot => {
            UsersArray.push(DataSnapshot.val())
            setUser(UsersArray)
        })
    }

    const addAttendanceListeners = async () => {
        let AttendanceArray = [];
        await AttendanceRef.on('child_added', DataSnapshot => {
            AttendanceArray.push(DataSnapshot.val())


            setAttendance(AttendanceArray)
        })
    }

    const addScheduleListeners = async () => {
        let ScheduleArray = [];
        await ScheduleRef.on('child_added', DataSnapshot => {
            ScheduleArray.push(DataSnapshot.val())
            ScheduleArray.sort(function (a, b) {
                return parseInt(a.day) - parseInt(b.day)
            })
            ScheduleArray.sort(function (a, b) {
                return parseInt(a.month) - parseInt(b.month)
            })
            ScheduleArray.sort(function (a, b) {
                return parseInt(a.year) - parseInt(b.year)
            })
            setSchedule(ScheduleArray)
        })
    }

    useEffect(() => {

        addScheduleListeners();
        addAttendanceListeners();
        addUserListeners();

    }, []);



    // schedules
    const renderScheduleList = (schedules) =>
        // Attendance.map(attend => console.log(attend['강민서'].schedule_id))
        schedules.length > 0 &&
        schedules.map((schedule) => (
            <li className="Header_list">{schedule.month}/{schedule.day}</li>
            // <th style={{ width: '50px', padding: '5px 0', borderBottom: '2px solid #e4e4e4' }}>{schedule.month}/{schedule.day}</th>
        )) || <div> 스케줄이 없어서 출력 할 수 없습니다.</div>

    const renderUserStateList = (user) =>
        user.length > 0 && Schedule.length > 0 && user.map(user => (
            <ul className="List_Container">
                <li className="UserList" >{user.Username}</li>
                {/* <td style={{ height: '50px', width: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', fontWeight: '600', borderBottom: '2px solid #e4e4e4' }}>{user.Username}</td> */}
                {/* 스케줄 모델은 정렬된 상태이므로, 그 해당 td에 맞게 상태 검사를 한다. 2중 반복문 원리를 이용함. */}
                {
                    Schedule.map((schedule) =>
                        // 치명적인 논리 오류. Attendance의 객체 값만큼 반복하게 됨. 그래서 중간에 출석 체크 안되있으면 다 망가짐.
                        // 출석체크 했을 때만, Attendance 객체가 생성 되도록 했기 때문..
                        Attendance.map((attend) => {
                            return (
                                attend[user.Username]?.schedule_id === schedule.id &&
                                <li className="UserList" style={{
                                    backgroundColor: (
                                        attend[user.Username].state === '결석' && "#FF3232"
                                        || attend[user.Username].state === '지각' && "#FFD732"
                                        || attend[user.Username].state === '출석' && "#FFFF8C"
                                    )

                                }}>
                                    {" "}
                                </li>
                            )
                        })
                    )
                }
            </ul>
        ))


    return (
        <>
            <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '70%' }}>
                <h2>종합 출석 리스트</h2>
                <div style={{ display: 'flex' }}>
                    <span style={{ marginRight: '1rem', padding: '0.5rem', color: 'black', backgroundColor: "#FFFF8C", borderRadius: '30px' }}>출석</span>
                    <span style={{ marginRight: '1rem', padding: '0.5rem', color: 'black', backgroundColor: "#FFD732", borderRadius: '30px' }}>지각</span>
                    <span style={{ padding: '0.5rem', color: 'black', backgroundColor: "#FF3232", borderRadius: '30px' }}>결석</span>
                </div>
            </header>

            <div>
                <ul className="Header_Container">
                    <li className="Header_list">이름 / 스케줄</li>
                    {renderScheduleList(Schedule)}
                </ul>
                <ul className="UserState_Container">
                    {renderUserStateList(User)}
                </ul>

            </div>

            {/* <div style={{ textAlign: 'center', width: '1000px', height: '600px', overflow: 'scroll' }}>
                <table style={{ width: "100%", height: '80vh', overflow: 'auto' }} hover responsive>
                    <thead>
                        <tr>
                            <th style={{ width: '100px', display: Schedule.length <= 0 && 'none', borderBottom: '2px solid #e4e4e4', borderRight: '2px solid #e4e4e4' }}> 이름 / 스케줄</th>
                            {renderScheduleList(Schedule)}
                        </tr>
                    </thead>
                    <tbody>
                        {renderUserStateList(User)}
                    </tbody>
                </table>
            </div > */}
        </>

    );
}

export default AttendList;
