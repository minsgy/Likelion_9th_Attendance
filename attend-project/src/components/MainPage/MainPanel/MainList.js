import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import firebase from '../../../firebase';

import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';
import { Select } from 'antd';


const MainList = () => {
    const { Option } = Select;
    const [UserRef, setUserRef] = useState(firebase.database().ref("Users"));
    const [Users, setUsers] = useState([]);
    const [Attendance, setAttendance] = useState('');


    // Attendance(출석체크 모델의 경우, 단순하게 스케쥴 아이디 값을 저장해서 나타내는 것이 목표.)
    const schedule = useSelector(state => state.schedule.currentSchedule)

    const addUserListeners = async () => {
        let UsersArray = [];
        await UserRef.on('child_added', DataSnapshot => {
            UsersArray.push(DataSnapshot.val())
            console.log(UsersArray)
            setUsers(UsersArray)
        })
    }

    const handleChange = (value) => {
        setAttendance(value)
    }
    const renderUserList = (Users) =>
        // console.log(Users)
        Users.length > 0 &&
        Users.map(user => (
            <tr key={user.id}>
                <td>{user.Class}</td>
                <td>{user.Username}</td>
                <td>{user.Department}</td>
                <td>{user.Callnumber}</td>
                <td>
                    {user.id}
                    {schedule.id}
                    {/* <Select defaultValue="lucy" value={Attendance} onChange={handleChange}>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled" disabled>Disabled</Option>
                        <Option value="Yiminghe">yiminghe</Option>
                    </Select> */}
                </td>

            </tr>
        ))


    // 게속 실행
    useEffect(() => {
        addUserListeners();
        //컴포넌트 제거
        return (() => {
            UserRef.off();
        })
    }, [])

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
