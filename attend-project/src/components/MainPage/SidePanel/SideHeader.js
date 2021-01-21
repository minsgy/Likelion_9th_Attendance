import React from 'react';
import { useDispatch } from 'react-redux';
import { ClearSchedule } from '../../../redux/actions/schedule_action'

const SideHeader = () => {
    const dispatch = useDispatch();

    const HandleAttendListPage = () => {
        dispatch(ClearSchedule())
    }
    return (
        <>
            <div className="SideHeader">
                <img src="/images/sch-logo.png" style={{ width: '40px', height: '40px', }} alt="" />
                <h2 style={{
                    display: 'flex',
                    margin: 0,
                    padding: '1rem 0',
                    fontSize: '27px'
                }}> 세션리스트</h2>
            </div>
            <p onClick={HandleAttendListPage}>전체 출석 리스트 보기</p>
        </>
    );
}

export default SideHeader;
