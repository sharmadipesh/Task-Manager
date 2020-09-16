import {GET_CATEGORY,GET_EXPENSES} from 'redux/Types'
import {axiosNoAuth,axiosAuth} from 'config/axios-instances';
import {API_BASE_URL} from "config/config";
import idx from "idx";

export function addCategoryOperation(data,successCallBack,errorCallBack){
    return async function(dispatch){
        try{
            let response = await axiosAuth.post(API_BASE_URL+"/api/v1/user/add_category",data);
            console.log("response ",response)
            if(idx(response,_=>_.data.category_resource.name)){
                successCallBack && successCallBack(response)
            }
        }catch(e){
            console.log(e);
            errorCallBack && errorCallBack(e);
        }
    }
}

export function addExpenseOperation(data,successCallBack,errorCallBack){
    return async function(dispatch){
        try{
            let response = await axiosAuth.post(API_BASE_URL+"/api/v1/user/add_expense",data);
            console.log("response ",response)
            if(idx(response,_=>_.data.expense_resource.category)){
                successCallBack && successCallBack(response)
            }
        }catch(e){
            console.log(e);
            errorCallBack && errorCallBack(e);
        }
    }
}

export function getAllCategory(successCallBack,errorCallBack){
    return async function(dispatch){
        try{
            let response = await axiosAuth.get(API_BASE_URL+"/api/v1/user/categories");
            console.log("getAllCategory ",response)
            if(idx(response,_=>_.data.categories)){
                await dispatch({
                    type: GET_CATEGORY,
                    payload: idx(response,_=>_.data.categories)
                });
            }
        }catch(e){
            console.log(e);
            errorCallBack && errorCallBack(e);
        }
    }
}

export function getAllExpenses(data,successCallBack,errorCallBack){
    return async function(dispatch){
        try{
            let response
            // if(!data.category_name){
                // console.log("111")
            response = await axiosAuth.post(API_BASE_URL+"/api/v1/user/expense_details",data);
            // }else{
            //     console.log("222")
            //     response = await axiosAuth.post(API_BASE_URL+`/api/v1/user/expense_details/${data.category_name}`,data);
            // }
            if(idx(response,_=>_.data)){
                await dispatch({
                    type: GET_EXPENSES,
                    payload: idx(response,_=>_.data)
                });
                successCallBack && successCallBack(response)
            }
            console.log("getAllExpenses ",response)
            
        }catch(e){
            console.log(e);
            errorCallBack && errorCallBack(e);
        }
    }
}