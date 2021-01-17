import React from 'react';
import MainHeader from './MainHeader';
import MainList from './MainList';
const MainPanel = () => {
    return (
        <main style={{ display: 'flex', flexDirection: 'column' }}>
            <MainHeader />
            <MainList />
        </main>
    );
}

export default MainPanel;
