import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {Routes} from 'config/Routes';

class PrivateRoute extends Component {
    render() {
		const Component = this.props.component;
        return (
            <Route
                path={this.props.path}
                exact={this.props.exact}
                render={props=> this.props.login_status ?
					<Component {...props} />
                    :<Redirect to={{ pathname: "/" }} />
                }
            />    
        );
    }
}

function mapStateToProps(state) {
	return {
		login_status: state.Auth.login_status
	};
}

export default connect(mapStateToProps)(PrivateRoute);