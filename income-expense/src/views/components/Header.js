import React, { useState, useEffect } from 'react';
import {Routes} from 'config/Routes';

function Header(props) {
    const {pathname} = props.location
    const imageUrl = Routes.Dashboard == pathname ? '/img/dashboard.svg' :Routes.Setting == pathname ? '/img/setting.svg':'/img/income.svg';
    
    const logoutHandler = () =>{
        localStorage.clear();
        props.history.push('/');
    }

    return (
        <div className="header-style-container">
            <div className="header-left">
                <img src={imageUrl} alt="dashboard" height="40px" width="40px"/>
                <div className="name">{Routes.Dashboard == pathname ? 'Dashboard' :Routes.Setting == pathname ? 'Setting':'Income'}</div>
            </div>
            <div className="logout-btn" onClick={logoutHandler}>
                <img src="/img/logout.svg" height="30px" width="30px"/>
            </div>
        </div>
    );
}

export default Header