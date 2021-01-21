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
        schedules.length > 0 && schedules.map((schedule) => (
            <th>{schedule.month}/{schedule.day}</th>
        ))

    const renderUserStateList = (user) =>
        user.length > 0 && user.map(user => (
            <tr>
                <td>{user.Username}</td>
                {/* 스케줄 모델은 정렬된 상태이므로, 그 해당 td에 맞게 상태 검사를 한다. 2중 반복문 원리를 이용함. */}
                {
                    Schedule.map((schedule) =>
                        Attendance.map(attend => (
                            schedule?.id === attend[user.Username]?.schedule_id &&
                            <td style={{ backgroundColor: (attend[user.Username].state === '결석' && 'orange' || attend[user.Username].state === '지각' && 'yellow' || attend[user.Username].state === '출석' && 'green') }}>
                                {" "}
                            </td>

                        )

                        ))
                }
            </tr >
        ))


    return (
        <div>
            <Table style={{ textAlign: 'center' }} hover responsive>
                <thead>
                    <tr>
                        <th>이름 / 세션 날짜</th>
                        {/* 스케줄 리스트 들어갈 자리 */}
                        {renderScheduleList(Schedule)}
                    </tr>
                </thead>
                <tbody>
                    {renderUserStateList(User)}
                </tbody>
            </Table>
        </div>
    );
}

export default AttendList;
