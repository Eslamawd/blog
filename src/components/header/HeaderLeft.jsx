import React from 'react';

const HeaderLeft = ({toggle, setToggle}) => {
    return (
        <div className="header-left">
        <div className="header-logo">
            <strong>Souqe</strong>
             <i className="bi bi-infinity"></i>
        </div>
        <div onClick={() => setToggle(prev => !prev)} class="header-menu">
        <i class="bi bi-list"></i> |=|
        </div>

    </div>
    );
};

export default HeaderLeft;