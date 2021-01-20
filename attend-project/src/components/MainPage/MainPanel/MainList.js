import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import firebase from '../../../firebase';
import Table from 'react-bootstrap/Table';



const MainList = () => {

    const [UserRef, setUserRef] = useState(firebase.database().ref("Users").orderByChild('Class'));
    const [Users, setUsers] = useState([]);
    const [SearchUser, setSearchUser] = useState([]);

    const [AttendanceRef, setAttendanceRef] = useState(firebase.database().ref("Attendance"))
    const [SearchAttendRef, setSearchAttendRef] = useState(firebase.database())
    const [IsLoadingState, setIsLoadingState] = useState(false);
    // Attendance(출석체크 모델의 경우, 단순하게 스케쥴 아이디 값을 저장해서 나타내는 것이 목표.)
    const schedule = useSelector(state => state.schedule.currentSchedule)

    const addUserListeners = async () => {
        let UsersArray = [];
        await UserRef.on('child_added', DataSnapshot => {
            UsersArray.push(DataSnapshot.val())
            setUsers(UsersArray)
        })
    }

    // 폼 확인
    const isFormVaild = (user, schedule, value) =>
        user && schedule && value

    // Onchange를 통해서 선택 시, 바로 파이어베이스 업데이트
    const handleAttend = async (user, schedule, value) => {
        if (isFormVaild(user, schedule, value)) {
            const newAttendance = {
                user_id: user.id, // 연결 된 유저
                schedule_id: schedule.id, // 연결된 스케줄
                state: value // 상태
            }
            try {
                // 스케줄 -> 유저이름으로 구분하여, 업데이트
                await AttendanceRef.child(`${schedule.id}/${user.Username}`).update(newAttendance)

                // 저거 자체 SearchUser 넣을려했더니 무한로딩 되서 하나 로딩만듬
                if (IsLoadingState)
                    setIsLoadingState(false)
                else
                    setIsLoadingState(true)
            } catch (error) {
                alert(error)
            }
        } else {
            alert("스케줄을 다시 선택해주세요.")
        }
    }

    // 해당 맞는 스케줄/유저의 상태 값 
    const SearchState = async () => {
        const searchuser = []
        await SearchAttendRef.ref(`Attendance/${schedule.id}`).on('child_added', DataSnapshot => {
            searchuser.push(DataSnapshot.val())
            setSearchUser(searchuser)
        })
    }
    const renderUserList = (Users) =>

        Users.length > 0 &&
        Users.map(user => (
            <tr key={user.id}>
                <td>{user.Class}</td>
                <td>{user.Username}</td>
                <td>{user.Department}</td>
                <td>{user.Callnumber}</td>

                <td>
                    <form>
                        출석<input style={{ marginRight: '1rem' }} type='radio' name={user.id} value='출석' onChange={(e) => (handleAttend(user, schedule, e.target.value))} />
                            지각<input style={{ marginRight: '1rem' }} type='radio' name={user.id} value='지각' onChange={(e) => (handleAttend(user, schedule, e.target.value))} />
                            결석<input type='radio' name={user.id} value='결석' onChange={(e) => (handleAttend(user, schedule, e.target.value))} />
                    </form>
                </td>
                {SearchUser.map(searchUser => (
                    (searchUser.user_id === user.id && searchUser.schedule_id === schedule.id) &&
                    <td style={{ color: (searchUser.state === "결석" ? "red" : "blue") }}>{searchUser.state}</td>
                ))}
            </tr >
        ))


    // 계속 실행
    useEffect(() => {
        addUserListeners();
        SearchState();
    }, [schedule, IsLoadingState])  // schedule 변경시 값 가져오고, state 값 설정 시 실행된다.
    // 이게 있어야 값이 바뀌면서 갱신 된다..^^

    return (
        <div className="MainList">
            <Table hover responsive size="lg">
                <thead style={{ fontSize: '20px' }}>
                    <tr>
                        <th>학번</th>
                        <th>이름</th>
                        <th>학과</th>
                        <th>전화 번호</th>
                        <th>출석 여부</th>
                        <th>출석 상태</th>
                    </tr>
                </thead>
                <tbody style={{ fontSize: '15px' }}>
                    {renderUserList(Users)}
                </tbody>
            </Table>

        </div>
    );
}

export default MainList;
