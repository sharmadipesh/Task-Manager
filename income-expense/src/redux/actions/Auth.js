import {REDUX_SETUP,TOKEN} from 'redux/Types'
import {axiosNoAuth,axiosAuth} from 'config/axios-instances';
import {API_BASE_URL} from "config/config";

export function reduxSetup(successCallBack,errorCallBack){
    return async function(dispatch){
        try{
            await dispatch({
                type:REDUX_SETUP,
                payload:true
            })
            successCallBack && successCallBack()
        }catch(e){
            console.log(e);
            errorCallBack && errorCallBack(e);
        }
    }
}

export function signupHandler(data,successCallBack,errorCallBack){
    return async function(dispatch){
        try{
            let response = await axiosNoAuth.post(API_BASE_URL+"/api/v1/register",data);
            console.log("signupHandler ",response)
            localStorage.clear();
            localStorage.setItem("token",  response.data.user);
            successCallBack && successCallBack(response)
        }catch(e){
            console.log(e);
            errorCallBack && errorCallBack(e);
        }
    }
}

export function loginHandler(data,successCallBack,errorCallBack){
    return async function(dispatch){
        try{
            let response = await axiosNoAuth.post(API_BASE_URL+"/api/v1/login",data);
            console.log("loginHandler ",response);
            if(response.status == 200 || response.status == 201){
                await dispatch({
                    type: TOKEN,
                    payload: response.data.token
                });
                localStorage.clear();
                localStorage.setItem("token",  response.data.token);
                successCallBack && successCallBack(response)
            }
        }catch(e){
            console.log(e);
            errorCallBack && errorCallBack(e);
        }
    }
}