import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom';
import {Routes} from 'config/Routes';
import {connect} from 'react-redux';
// import Dashboard from 'views/dashboard/Dashboard';
import Dashboard from 'views/dashboard/dash';
import Header from 'views/components/Header';
import Sidebar from 'views/components/Sidebar';
import ComingSoon from 'views/coming-soon/Coming-soon';
import PrivateRoute from 'views/components/PrivateRoute';

class MainLayout extends Component {
    render() {
        return (
            <div>
                <Sidebar {...this.props}/>
                <div className="main-content-container">
                    <Header {...this.props}/>
                    <Switch>
                        <PrivateRoute exact component={()=><Dashboard {...this.props}/>} path={Routes.Dashboard}/>
                        <PrivateRoute exact component={()=><ComingSoon {...this.props}/>} path={Routes.Income}/>
                        <PrivateRoute exact component={()=><ComingSoon {...this.props}/>} path={Routes.Setting}/>
                    </Switch>
                </div> 
            </div>
        );
    }
}

export default MainLayout;