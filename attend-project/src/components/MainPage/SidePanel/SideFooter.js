import React from 'react';


const SideFooter = () => {
    return (
        <div className="SideFooter">
            <span style={{ fontSize: '13px', color: 'white' }}>Copyrightⓒ 2021 <strong onClick={() => {
                window.location.href = 'https://github.com/minsgy';
            }} style={{ color: 'black' }}>민석</strong> All rights reserved.</span>
        </div>
    );
}

export default SideFooter;
