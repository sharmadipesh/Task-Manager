import {combineReducers} from 'redux';
import Auth from './Auth';

const appReducer = combineReducers({
    Auth
})

const rootReducer = (state,actions) =>{
    return appReducer(state,actions);
}

export default rootReducer;