import {combineReducers} from "redux";
import types from './type';

const Counter_State = {
    counter: 0
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


const reducer = combineReducers({
    CounterReducer
})

export default reducer;