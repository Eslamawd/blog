import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/header/Header';

const LayOut = ({ requistFrind }) => {
    return (
        <div>
            <Header requistFrind={requistFrind} />
         
            <Outlet />
            
        </div>
    );
};

export default LayOut;