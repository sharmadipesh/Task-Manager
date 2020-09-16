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
                render={props=> this.props.token ?
					<Component {...props} />
                    :<Redirect to={{ pathname: "/" }} />
                }
            />    
        );
    }
}

function mapStateToProps(state) {
	return {
		token: state.Auth.token
	};
}

export default connect(mapStateToProps)(PrivateRoute);