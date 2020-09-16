import React,{Component} from 'react';
import 'styles/index.scss';
import logger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'redux/reducers'
import {axiosAuthMiddleware} from 'middleware/axios-middleware';
import Login from 'views/authentication/Login'
import Signup from 'views/authentication/Signup'
import { BrowserRouter as Router, Route } from "react-router-dom";
import {Routes} from 'config/Routes';
import MainLayout from 'container/MainLayout';
import PrivateRoute from 'views/components/PrivateRoute';

const createStoreWithMiddleware = applyMiddleware(
  axiosAuthMiddleware,
  reduxThunk,
  logger
)(createStore);

const store = createStoreWithMiddleware(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const token = localStorage.getItem('token');

if (token) {
    store.dispatch({
        type: 'TOKEN',
        payload: token
    });
}

function Auth(store) {
    window.addEventListener(
    'storage',
        storageEvent => {
        // the event seems not to fire on own state changes, only other windows
        const token = localStorage.getItem('token');

        if (token) {
            store.dispatch({
            type: 'TOKEN',
            payload: token
            });
        }
        },
    false
    );
}

class App extends Component {
  componentDidMount = async () => {
    Auth(store);
    const token = await localStorage.getItem('token');
    if (token) {
      store.dispatch({
        type: 'TOKEN',
        payload: token
      });
    }
  };
  render(){
    return (
      <div className="App">
        <Provider store={store}>
          <Router>
              <Route exact component={Login} path={Routes.Landingpage}/>
              <Route exact component={Login} path={Routes.Login}/>
              <Route exact component={Signup} path={Routes.Signup}/>
              <PrivateRoute component={MainLayout} path={Routes.Dashboard}/>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
