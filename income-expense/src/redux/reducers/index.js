import { combineReducers } from 'redux';
import Auth from 'redux/reducers/Auth';
import Dashboard from 'redux/reducers/Dashboard';

const appReducer = combineReducers({
    Auth,
    Dashboard
});

const rootReducer = (state, action) => {
	return appReducer(state, action);
};

export default rootReducer;
