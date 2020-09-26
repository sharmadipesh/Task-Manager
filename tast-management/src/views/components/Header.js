import React, { Component } from 'react';
import {Routes} from 'config/Routes';

class HeaderContainer extends Component {

    logoutHandler = () =>{
        // localStorage
        localStorage.clear();
        this.props.history.push(Routes.LandingPage)
    }

    render() {
        return (
            <div className="Header-style-container">
                <div className="logo-container">
                    <img alt="task-manager" src="/img/logo.svg" height="40px" width="auto"/>
                    <div className="logo-text">Task Manager</div>
                </div>
                <div className="logout-btn" onClick={this.logoutHandler}>
                    <img src="/img/logout.svg" alt="log-out" height="30px" width="30px"/>
                </div>
            </div>
        );
    }
}

export default HeaderContainer;