import { combineReducers } from "redux";
import {
    CREATE_PASSWORD_RESET_REQUEST, CREATE_PASSWORD_RESET_FAILURE, CREATE_PASSWORD_RESET_SUCCESS,
    CONFIRM_PASSWORD_RESET_REQUEST, CONFIRM_PASSWORD_RESET_FAILURE, CONFIRM_PASSWORD_RESET_SUCCESS
} from "./actions";

const initState = {
    isFetching: false,
    stage: 'enter-email'
};

const isFetchingReducer = (state = initState.isFetching, action) => {
    switch (action.type) {
        case CREATE_PASSWORD_RESET_REQUEST:
        case CONFIRM_PASSWORD_RESET_REQUEST:
            return true;
        case CREATE_PASSWORD_RESET_FAILURE:
        case CREATE_PASSWORD_RESET_SUCCESS:
        case CONFIRM_PASSWORD_RESET_FAILURE:
        case CONFIRM_PASSWORD_RESET_SUCCESS:
            return false;
        default:
            return state;
    }
};

const stageReducer = (state = initState.stage, action) => {
    switch (action.type) {
        case CREATE_PASSWORD_RESET_SUCCESS:
            return 'enter-otp';
        case CONFIRM_PASSWORD_RESET_SUCCESS:
            return 'finish';
        default:
            return state;
    }
};

export const passwordResetReducer = combineReducers({
    isFetching: isFetchingReducer,
    stage: stageReducer
});

export default passwordResetReducer;
