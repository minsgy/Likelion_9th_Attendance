import React from 'react';
import MainHeader from './MainHeader';
import MainList from './MainList';

const MainPanel = () => {
    return (
        <>
            <div>
                <MainHeader />
            </div>
            <div >
                <MainList />
            </div>
        </>
    );
}

export default MainPanel;
