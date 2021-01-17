import React from 'react';


const SideHeader = () => {
    return (
        <div className="SideHeader">
            <img src="/images/sch-logo.png" style={{ width: '40px', height: '40px', }} alt="" />
            <h2 style={{
                display: 'flex',
                margin: 0,
                padding: '1rem 0',
                fontSize: '27px'
            }}> 세션리스트</h2>

        </div >
    );
}

export default SideHeader;
