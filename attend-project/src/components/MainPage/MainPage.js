import React from 'react';
import SidePanel from './SidePanel/SidePanel';
import MainPanel from './MainPanel/MainPanel';
const MainPage = () => {
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            {/* 사이트 리스트 */}
            <div style={{ width: '300px', backgroundColor: '#e4e4e4' }}>
                <SidePanel />
            </div>
            {/* 메인 리스트 */}
            <div style={{ width: '100%' }}>
                <MainPanel />
            </div>
        </div>
    );
}

export default MainPage;
