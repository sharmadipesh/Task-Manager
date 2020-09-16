import {REDUX_SETUP,TOKEN} from 'redux/Types';

const initial_state={
    redux_setup:false,
    token:null
}

export default (state=initial_state,action)=>{
    switch(action.type){
        case REDUX_SETUP: return{
            ...state,
            redux_setup:action.payload
        };
        case TOKEN: return{
            ...state,
            token:action.payload
        };
        default:
			return state;
    }
}