import {combineReducers} from "redux";
import types from './type';


const Counter_State = {
    counter: 0
}

const Api_State = {
    data : []
}

const ACTION_HANDLERS = {
    [types.INCREMENT]: (state, action) => ({
        ...state,
        counter: state.counter + 1
    })
}

function CounterReducer(state = Counter_State, action) {
    const reducer = ACTION_HANDLERS[action.type];
    return reducer ? reducer(state, action) : state;
}

const ApiReducer = (state = Api_State , action) => {
    switch (action.type) {
        case types.SAVE_DATA : 
        return Object.assign({},state,{
            data : action.apiData
        })
        default :
        return state
    }
}


const reducer = combineReducers({
    CounterReducer,
    ApiReducer
})

export default reducer;