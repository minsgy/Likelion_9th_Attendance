import React from 'react';
import SideFooter from './SideFooter';
import SideHeader from './SideHeader';
import SideList from './SideList';

const SidePanel = () => {
    return (
        <div>
            <SideHeader />
            <SideList />
            <SideFooter />
        </div>
    );
}

export default SidePanel;
