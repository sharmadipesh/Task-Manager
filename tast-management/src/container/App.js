import React, { Component } from 'react';
import 'styles/index.scss';
import Login from "views/Login";
import MainLayout from 'container/MainLayout';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import {Routes} from 'config/Routes';
import logger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import reducers from 'redux/reducers';
import PrivateRoute from 'views/components/PrivateRoute';

const createStoreWithMiddleware =applyMiddleware(
  reduxThunk,
  logger
)(createStore);

const store = createStoreWithMiddleware(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const login_status = localStorage.getItem('login_status');

if (login_status) {
    store.dispatch({
        type: 'LOGIN_STATUS',
        payload: login_status
    });
}

function Auth(store) {
    window.addEventListener(
    'storage',
        storageEvent => {
        // the event seems not to fire on own state changes, only other windows
        const login_status = localStorage.getItem('login_status');

        if (login_status) {
            store.dispatch({
            type: 'LOGIN_STATUS',
            payload: login_status
            });
        }
        },
    false
    );
}

class App extends Component {

  componentDidMount = async () => {
    Auth(store);
    const login_status = await localStorage.getItem('login_status');
    if (login_status) {
      store.dispatch({
        type: 'LOGIN_STATUS',
        payload: login_status
      });
    }
  };

  render() {
    return (
      <div>
        <Provider store={store}>
          <Router>
            <Route exact component={Login} path={Routes.LandingPage}/>
            <Route exact component={Login} path={Routes.Login}/>
            <PrivateRoute exact component={MainLayout} path={Routes.Dashboard}/>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
