import React from 'react';
import SideFooter from './SideFooter';
import SideHeader from './SideHeader';
import SideList from './SideList';

const SidePanel = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <SideHeader />
            <SideList />
            <SideFooter />
        </div>
    );
}

export default SidePanel;
