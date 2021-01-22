import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { SetCurrentAuth } from '../../redux/actions/auth_action'

const AuthPage = () => {

    const [code, setcode] = useState("");

    const dispatch = useDispatch()
    const history = useHistory()
    const handleSubmit = (e) => {
        e.preventDefault();
        if (code === 'likelionadmin') {
            dispatch(SetCurrentAuth(code))
            alert("운영진 인증 완료")
            history.push("/main")
        }
        else if (code === 'likelion') {
            dispatch(SetCurrentAuth(code))
            alert("유저 접속 완료")
            history.push("/main")
        }
        else if (code === '울부짖어라밈미') {
            dispatch(SetCurrentAuth(code))
            alert("유민에게 주는 선물")
            history.push("/main")
        }
        else if (code === '울어라두부') {
            dispatch(SetCurrentAuth(code))
            alert("율희에게 주는 선물")
            history.push("/main")
        }
        else {
            alert("코드가 잘못 됐습니다.")
        }
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            <div style={{ width: '300px', height: '150px' }}>
                <h2 style={{ textAlign: 'center' }}>출석부 인증 페이지</h2>
                <Form>
                    <Form.Group>
                        <Form.Label>접속 코드</Form.Label>
                        <Form.Control type="text" placeholder="접속 코드를 입력하세요" value={code} onChange={(e) => {
                            setcode(e.target.value)
                        }} />
                        <Form.Text className="text-muted">
                            이 페이지는 🦁멋쟁이사자처럼 at 순천향대학교 출석부 입니다.
                        </Form.Text>
                    </Form.Group>
                    <Button style={{ width: '100%' }} variant="primary" type="submit" onClick={handleSubmit}>
                        접속하기
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default AuthPage;
