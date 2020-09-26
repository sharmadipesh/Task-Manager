import {REDUX_SETUP,TASK_ADDED,LOGIN_STATUS,TASK_DELETE,TASK_UPDATED} from '../Types';

export function reduxSetup(successCallBack,errorCallBack){
    return async function(dispatch){
        try{
            await dispatch({
                type:REDUX_SETUP,
                payload:true
            })
            // localStorage.setItem("login_status",  false);
            successCallBack && successCallBack();
        }catch(e){
            console.log(e);
            errorCallBack && errorCallBack(e);
        }
    }
}

export function taskAddHandler(task_info,successCallBack,errorCallBack){
    return async function(dispatch){
        try{
            await dispatch({
                type:TASK_ADDED,
                payload:task_info
            })
            successCallBack && successCallBack();
        }catch(e){
            console.log(e);
            errorCallBack && errorCallBack(e);
        }
    }
}

export function taskDeleteHandler(task_info,successCallBack,errorCallBack){
    return async function(dispatch){
        try{
            await dispatch({
                type:TASK_DELETE,
                payload:task_info
            })
            successCallBack && successCallBack();
        }catch(e){
            console.log(e);
            errorCallBack && errorCallBack(e);
        }
    }
}

export function taskUpdateHandler(task_info,successCallBack,errorCallBack){
    return async function(dispatch){
        try{
            await dispatch({
                type:TASK_UPDATED,
                payload:task_info
            })
            successCallBack && successCallBack();
        }catch(e){
            console.log(e);
            errorCallBack && errorCallBack(e);
        }
    }
}

export function loginAuthHnadler(successCallBack,errorCallBack){
    return async function(dispatch){
        try{
            await dispatch({
                type:LOGIN_STATUS,
                payload:true
            })
            localStorage.setItem("login_status",  true);
            successCallBack && successCallBack();
        }catch(e){
            console.log(e);
            errorCallBack && errorCallBack(e);
        }
    }
}