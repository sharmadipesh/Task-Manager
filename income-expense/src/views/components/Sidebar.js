import React, { useState, useEffect } from 'react';
import {Routes} from 'config/Routes';

function Sidebar(props) {
    const {pathname} = props.location
    return (
        <div className="sidebar-style-container">
            <div className="company-logo">
                <img src="/img/expenses.svg" height="60px" width="60px" className="mb-5 mt-15"/>
                {/* <div>Expense Manager</div> */}
            </div>
            <div className="mt-45 link-container mb-35 clickable" onClick={()=>props.history.push(Routes.Dashboard)}>
                <img src={Routes.Dashboard == pathname?"/img/dashboard.svg" :"/img/de-dashboard.svg"} height="30px" width="30px" className="mb-5"/>
                <div className={Routes.Dashboard == pathname? "active-link-st" :"de-active-link-st"}>Dashboard</div>
            </div>
            <div className="mb-35 link-container clickable" onClick={()=>props.history.push(Routes.Income)}>
                <img src={Routes.Income == pathname?"/img/income.svg" :"/img/de-income.svg"} height="30px" width="30px" className="mb-5"/>
                <div className={Routes.Income == pathname? "active-link-st" :"de-active-link-st"}>Income</div>
            </div>
            <div className="mb-20 link-container clickable" onClick={()=>props.history.push(Routes.Setting)}>
                <img src={Routes.Setting == pathname? "/img/setting.svg" :"/img/de-setting.svg"} height="30px" width="30px" className="mb-5"/>
                <div className={Routes.Setting == pathname? "active-link-st" :"de-active-link-st"}>Setting</div>
            </div>
        </div>
    );
}

export default Sidebar