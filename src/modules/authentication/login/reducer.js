import {
    LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS
} from "./actions";
import { combineReducers } from "redux";

const initState = {
    isFetching: false
};

const isFetchingReducer = (state = initState.isFetching, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return true;
        case LOGIN_FAILURE:
        case LOGIN_SUCCESS:
            return false;
        default:
            return state;
    }
}

const loginReducer = combineReducers({
    isFetching: isFetchingReducer
});

export default loginReducer;
