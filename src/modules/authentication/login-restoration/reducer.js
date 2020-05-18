import { LOGIN_RESTORE_REQUEST, LOGIN_RESTORE_FAILURE, LOGIN_RESTORE_SUCCESS } from "./actions";
import { combineReducers } from "redux";

const initState = {
    isRestoring: true
};

const isRestoringgReducer = (state = initState.isRestoring, action) => {
    switch (action.type) {
        case LOGIN_RESTORE_REQUEST:
            return true;
        case LOGIN_RESTORE_FAILURE:
        case LOGIN_RESTORE_SUCCESS:
            return false;
        default:
            return state;
    }
};

const loginRestorationReducer = combineReducers({
    isRestoring:  isRestoringgReducer
});

export default loginRestorationReducer;
