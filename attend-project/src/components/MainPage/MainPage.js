import React from 'react';
import SidePanel from './SidePanel/SidePanel';
import MainPanel from './MainPanel/MainPanel';
const MainPage = () => {
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

export default MainPage;
