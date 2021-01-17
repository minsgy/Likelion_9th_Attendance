import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSchedule } from '../../../redux/actions/schedule_action'

import firebase from '../../../firebase'
import 'moment/locale/ko'
import moment from 'moment'
// design
import ListGroup from 'react-bootstrap/ListGroup';
import { FaRegCalendarPlus } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { DatePicker } from 'antd';


const SideList = () => {
    const [show, setShow] = useState(false);

    const [Datetime, setDatetime] = useState(moment);
    const [Description, setDescription] = useState("");

    // 스케줄 
    const [ScheduleRef, setScheduleRef] = useState(firebase.database().ref("Schedule"));
    const [Schedule, setSchedule] = useState([]);
    // 현재 선택 된 스케줄
    const [ActiveScheduleId, setActiveScheduleId] = useState("")

    // Modal Page
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch();


    // 폼 유효성
    const isFormVaild = (dt, desc) => dt && desc;


    // 폼 생성하기
    const handleSubmit = (e) => {
        e.preventDefault();
        // 제대로 값이 들어갔을때만 실행함.
        if (isFormVaild(Datetime, Description)) {
            addSchedule();
        }
    }

    const changeSchedule = (schedule) => {
        dispatch(setCurrentSchedule(schedule))
        setActiveScheduleId(schedule.id)
    }

    const AddScheduleListeners = async () => {
        let SchedulesArray = [];
        await ScheduleRef.on("child_added", DataSnapshot => {
            SchedulesArray.push(DataSnapshot.val());
            setSchedule(SchedulesArray);
        })
    }

    // 게속 실행
    useEffect(() => {
        AddScheduleListeners();
        // 컴포넌트 제거
        return (() => {
            ScheduleRef.off();
        })

    }, [])
    // 스케줄 출력하기
    const renderScheduleList = (Schedules) =>
        Schedules.length > 0 &&
        Schedules.map(schedule => (
            <ListGroup.Item
                key={schedule.id}
                style={{ backgroundColor: ActiveScheduleId === schedule.id && "#e4e4e4" }}
                onClick={() => changeSchedule(schedule)}
            > {schedule.Datetime}{" "}[{ schedule.Description}]</ListGroup.Item >
        ))

    // 세션 일정 추가 함수
    const addSchedule = () => {
        const key = ScheduleRef.push().key;
        const newSchedule = {
            id: key,
            Datetime: Datetime,
            Description: Description
        }
        try {
            ScheduleRef.child(key).update(newSchedule)
            // 만들어진 스케줄ref에 업데이트하여 스케줄값 추가
            setShow(false); // modal 창 삭제
            // 세션 일정 입력한 거 다 초기화하기
            setDatetime(moment);
            setDescription("");
            console.log(Datetime)
            console.log(Description)
        } catch (error) {
            alert(error)
        }
    }




    return (
        <div className="SideList">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h4 style={{ color: 'white' }}>일정 리스트</h4>
                <FaRegCalendarPlus
                    style={{
                        fontSize: '30px',
                        color: 'white'
                    }}
                    onClick={handleShow}
                />
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>세션 일정 생성</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>세션 일정</Form.Label>
                                <br />
                                <DatePicker onChange={(val) => {
                                    setDatetime(val.format("MMMM Do, a h시 mm분"))
                                }} showTime format="MM월 DD일 h시 m분 a" />
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
                        <Button variant="secondary" onClick={handleClose}>
                            취소
                        </Button>
                        <Button variant="primary" onClick={handleSubmit}>
                            일정 생성하기
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
            <ListGroup>
                {renderScheduleList(Schedule)}
            </ListGroup>
        </div>
    );
}

export default SideList;
