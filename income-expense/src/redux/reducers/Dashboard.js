import {GET_CATEGORY,GET_EXPENSES} from 'redux/Types';

const initial_state={
    category_data:[],
    expenses_data:[]
}

export default (state=initial_state,action)=>{
    switch(action.type){
        case GET_CATEGORY: return{
            ...state,
            category_data:action.payload
        };
        case GET_EXPENSES: return{
            ...state,
            expenses_data:action.payload
        };
        default:
			return state;
    }
}