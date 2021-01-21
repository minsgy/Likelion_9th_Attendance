import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSchedule } from '../../../redux/actions/schedule_action'

import firebase from '../../../firebase'
import 'moment/locale/ko'
import moment from 'moment'
// design
import ListGroup from 'react-bootstrap/ListGroup';
import { FaRegCalendarPlus } from 'react-icons/fa';
import { AiOutlineUserAdd } from 'react-icons/ai';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { DatePicker } from 'antd';


const SideList = () => {
    // Modal Page 
    const [show, setShow] = useState(false); // 일정 생성
    const [Usershow, setUsershow] = useState(false); // 유저 생성

    // 스케줄 들어갈 값
    const [Datetime, setDatetime] = useState("");
    const [Description, setDescription] = useState("");

    const [Users, setUsers] = useState([]); // 스케줄에 넣을 학생리스트
    // 유저 정보 들어갈 값
    const [Class, setClass] = useState(''); // 학번
    const [Username, setUsername] = useState(''); // 유저 이름
    const [Department, setDepartment] = useState(''); // 학과 이름
    const [Callnumber, setCallnumber] = useState(''); // 휴대폰 번호
    // const [Attendance, setAttendance] = useState(); // 출석 여부 체크, users 하위에 추가함.

    const [UserRef, setUserRef] = useState(firebase.database().ref("Users"))
    // const [AttendanceRef, setAttendanceRef] = useState(firebase.database().ref("attendance"))

    // 스케줄
    const [ScheduleRef, setScheduleRef] = useState(firebase.database().ref("Schedule"));

    const [Schedule, setSchedule] = useState([]);
    // 현재 선택 된 스케줄
    const [ActiveScheduleId, setActiveScheduleId] = useState("")

    // Modal Page [일정 생성]
    const handleClose1 = () => setShow(false);
    const handleShow1 = () => setShow(true);

    // Modal Page [유저 생성]
    const handleClose2 = () => setUsershow(false);
    const handleShow2 = () => setUsershow(true);


    const dispatch = useDispatch();


    // 폼 유효성
    const isScheduleFormVaild = (dt, desc) => dt && desc; // 스케줄 폼
    const isUserFormVaild = (cl, username, department, callnumber) =>
        cl && username && department && callnumber;

    // 스케줄 생성
    const handleScheduleSubmit = (e) => {
        e.preventDefault();
        // 제대로 값이 들어갔을때만 실행함.
        if (isScheduleFormVaild(Datetime, Description)) {
            addSchedule();
        }
    }

    const handleUserSubmit = (e) => {
        e.preventDefault();
        if (isUserFormVaild(Class, Username, Department, Callnumber)) {
            addUser();
        }
    }

    const changeSchedule = (schedule) => {
        dispatch(setCurrentSchedule(schedule))
        setActiveScheduleId(schedule.id)
    }


    const AddScheduleListeners = async () => {
        let SchedulesArray = [];
        let UsersArray = [];
        await ScheduleRef.on("child_added", DataSnapshot => {
            SchedulesArray.push(DataSnapshot.val());
            // 날짜, 월, 년 순으로 완전 정렬
            SchedulesArray.sort(function (a, b) {
                return parseInt(a.day) - parseInt(b.day)
            })
            SchedulesArray.sort(function (a, b) {
                return parseInt(a.month) - parseInt(b.month)
            })
            SchedulesArray.sort(function (a, b) {
                return parseInt(a.year) - parseInt(b.year)
            })
            setSchedule(SchedulesArray);
        })
        UserRef.on("child_added", DataSnapshot => {
            UsersArray.push(DataSnapshot.val());
            setUsers(UsersArray);
        })
    }




    // 게속 실행
    useEffect(() => {
        AddScheduleListeners();
        // 컴포넌트 제거

    }, [])

    // 스케줄 출력하기
    const renderScheduleList = (Schedules) =>
        Schedules.length > 0 &&
        Schedules.map(schedule => (
            <ListGroup.Item
                key={schedule.id}
                style={{ backgroundColor: ActiveScheduleId === schedule.id && "#e4e4e4" }}
                onClick={() => changeSchedule(schedule)}
            >
                <span style={{
                    fontSize: '20px',
                    display: 'block',
                    margin: 0
                }}>{schedule.Description}</span>

                <span style={{
                    fontSize: '12px'
                }}>{schedule.year}-{schedule.month}-{schedule.day}
                </span></ListGroup.Item >
        ))

    // 세션 일정 추가 함수
    const addSchedule = async () => {
        const key = ScheduleRef.push().key;
        const newSchedule = {
            year: Datetime.substring(0, 4),
            month: Datetime.substring(5, 7),
            day: Datetime.substring(8, 10),
            Description: Description,
            id: key
        }
        try {
            await ScheduleRef.child(key).update(newSchedule)
            setShow(false); // modal 창 닫기

            // 세션 일정 입력한 거 다 초기화하기
            setDatetime("");
            setUsers([]);
            setDescription("");
        } catch (error) {
            alert(error)
        }
    }

    // 유저 추가하기
    const addUser = async () => {
        const key = UserRef.push().key;
        const newAddUser = {
            id: key,
            Class: Class,
            Username: Username,
            Department: Department,
            Callnumber: Callnumber,
        }
        try {
            await UserRef.child(key).update(newAddUser)
            // 만들어진 스케줄ref에 업데이트하여 스케줄값 추가
            setUsershow(false); // modal 창 닫기
            // 세션 일정 입력한 거 다 초기화하기
            setClass("");
            setUsername("");
            setDepartment("");
            setCallnumber("");
        } catch (error) {
            alert(error)
        }
    }





    return (
        <div className="SideList">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h4 style={{ color: 'white' }}>일정 리스트</h4>
                <div>
                    <FaRegCalendarPlus
                        style={{
                            fontSize: '30px',
                            color: 'white'
                        }}
                        onClick={handleShow1}
                    />
                    <AiOutlineUserAdd
                        style={{
                            fontSize: '30px',
                            color: 'white'
                        }}
                        onClick={handleShow2}
                    />
                </div>
                <Modal show={show} onHide={handleClose1}>
                    <Modal.Header closeButton>
                        <Modal.Title>세션 일정 생성</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>세션 일정</Form.Label>
                                <br />
                                <DatePicker onChange={(val) => {
                                    setDatetime(val.format("YYYY-MM-DD"))
                                }} />
                                <br />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>
                                    세션 주제
                                </Form.Label>
                                <Form.Control type="text" onChange={(e) => {
                                    setDescription(e.target.value)
                                }} placeholder="세션 주제를 입력하세요." />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose1}>
                            취소
                        </Button>
                        <Button variant="primary" onClick={handleScheduleSubmit}>
                            일정 생성하기
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* 유저 생성 modal 창 */}
                <Modal show={Usershow} onHide={handleClose2}>
                    <Modal.Header closeButton>
                        <Modal.Title>유저 생성</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        {/* Form */}
                        <Form>
                            <Form.Group>
                                <Form.Label>
                                    학번
                                </Form.Label>
                                <Form.Control type="text"
                                    onChange={(e) => {
                                        setClass(e.target.value)
                                    }} placeholder='학번(16,17)을 입력해주세요.' />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>
                                    멤버 이름
                                </Form.Label>
                                <Form.Control
                                    onChange={(e) => {
                                        setUsername(e.target.value)
                                    }} type="text" placeholder='이름을 입력해주세요.' />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>
                                    학과
                                </Form.Label>
                                <Form.Control
                                    onChange={(e) => {
                                        setDepartment(e.target.value)
                                    }} type="text" placeholder='학과를 입력해주세요.' />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>
                                    전화 번호
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={(e) => {
                                        setCallnumber(e.target.value)
                                    }} placeholder='전화번호을 입력해주세요.' />
                            </Form.Group>
                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose2}>
                            취소
                        </Button>
                        <Button variant="primary" onClick={handleUserSubmit}>
                            멤버 추가하기
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
            <ListGroup style={{ maxHeight: '600px', overflowY: 'auto' }}>
                {renderScheduleList(Schedule)}
            </ListGroup>
        </div >
    );
}

export default SideList;
