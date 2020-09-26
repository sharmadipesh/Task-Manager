import {REDUX_SETUP,TASK_ADDED,LOGIN_STATUS,TASK_DELETE,TASK_UPDATED} from '../Types';

const initial_state={
    login_status:false,
    redux_setup:false,
    task_information:[]
}

export default(state=initial_state,action)=>{
    switch(action.type){
        case LOGIN_STATUS:return{
            ...state,
            login_status:action.payload
        }
        case REDUX_SETUP:return{
            ...state,
            redux_setup:action.payload
        }
        case TASK_ADDED:return{
            ...state,
            task_information:[...state.task_information,action.payload]
        }
        case TASK_DELETE:return{
            ...state,
            task_information:action.payload
        }
        case TASK_UPDATED:return{
            ...state,
            task_information:action.payload
        }
        default: return state;
    }
}