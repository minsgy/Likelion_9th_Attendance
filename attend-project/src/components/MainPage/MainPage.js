import React from 'react';
import { useSelector } from 'react-redux';
import SidePanel from './SidePanel/SidePanel';
import MainPanel from './MainPanel/MainPanel';
const MainPage = () => {

    const auth = useSelector(state => state.auth.currentAuth)

    // 운영진 코드
    if (auth === 'likelionadmin') {
        return (
            <div style={{
                display: 'flex',
                height: '100vh',
                fontFamily: 'IBMPlexSansKR-Text'
            }}>
                {/* 사이트 리스트 */}
                <div style={{
                    minWidth: '300px',
                    backgroundColor: '#F2A240',
                    padding: '2rem 1rem'
                }}>
                    <SidePanel />
                </div>
                {/* 메인 리스트 */}
                <div style={{
                    width: '100%'
                }}>
                    <MainPanel />
                </div>
            </div>
        );
    }
    // 유저 코드
    else if (auth === 'likelion') {
        return (
            <div style={{
                display: 'flex',
                height: '100vh',
                fontFamily: 'IBMPlexSansKR-Text'
            }}>
                {/* 메인 리스트 */}
                <div style={{
                    width: '100%'
                }}>
                    <MainPanel />
                </div>
            </div>
        );
    }
    // 하유민 이스터에그
    else if (auth === '울부짖어라밈미') {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                height: '100vh'
            }}>
                <h2>밈미의 축복을 받기위해 들어오셨군요!</h2>
                <h4>선물로 밈미를 드리겠습니다.</h4>
                <div style={{ display: 'flex' }}>
                    <img style={{ width: '200px', height: '200px', marginRight: '1rem' }} src="images/1.jpeg" alt="밈미사진" />
                    <img style={{ width: '200px', height: '200px', marginRight: '1rem' }} src="images/2.jpeg" alt="밈미사진" />
                    <img style={{ width: '200px', height: '200px', marginRight: '1rem' }} src="images/3.jpeg" alt="밈미사진" />
                </div>
            </div>
        )
    }
    // 김율희 이스터에그
    else if (auth === '울어라두부') {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                height: '100vh'
            }}>
                <h2>두부의 우렁찬 부름에 오셨군요!</h2>
                <h4>선물로 두부를 드리겠습니다.</h4>
                <div style={{ display: 'flex' }}>
                    <img style={{ width: '200px', height: '200px', marginRight: '1rem' }} src="images/Dubu1.jpeg" alt="두부사진" />
                    <img style={{ width: '200px', height: '200px', marginRight: '1rem' }} src="images/Dubu2.jpeg" alt="두부사진" />
                    <img style={{ width: '200px', height: '200px', marginRight: '1rem' }} src="images/Dubu3.jpeg" alt="두부사진" />
                </div>
            </div>
        )
    }
    // 인증없이 URL 접속시 차단.
    else {
        return (<div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: '100vh',

        }}>
            <h2 >정상적인 경로로 들어오지 않았습니다.</h2>
            <h4 style={{ color: 'red' }}>다시 인증해주세요!</h4>
        </div>)
    }
}

export default MainPage;
