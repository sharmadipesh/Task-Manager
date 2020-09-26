import React, { Component } from 'react';
import Header from 'views/components/Header';
import {Route,Switch} from 'react-router-dom';
import Dashboard from 'views/Dashboard';
import {Routes} from 'config/Routes';
import PrivateRoute from 'views/components/PrivateRoute';

class MainLayout extends Component {
    render() {
        return (
            <div>
                <Header {...this.props}/>
                <div className="main-app-container">
                    <Switch>
                        <PrivateRoute exact component={Dashboard} path={Routes.Dashboard}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default MainLayout;