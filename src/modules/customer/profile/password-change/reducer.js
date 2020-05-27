import { combineReducers } from "redux";
import {
    PASSWORD_CHANGE_INPUT_CHANGE,
    CREATE_PASSWORD_CHANGE_REQUEST, CREATE_PASSWORD_CHANGE_FAILURE, CREATE_PASSWORD_CHANGE_SUCCESS
} from "./actions";

const initState = {
    isFetching: false,
    inputs: {
        oldPassword: '',
        newPassword: '',
        newPasswordConfirmation: ''
    }
};

const inputsReducer = (state = initState.inputs, action) => {
    switch (action.type) {
        case PASSWORD_CHANGE_INPUT_CHANGE:
            return Object.assign({}, state, {
                [action.payload.name]: action.payload.value
            });
        case CREATE_PASSWORD_CHANGE_SUCCESS:
            return initState.inputs;
        default:
            return state;
    }
};

const isFetchingReducer = (state = initState.isFetching, action) => {
    switch (action.type) {
        case CREATE_PASSWORD_CHANGE_REQUEST:
            return true;
        case CREATE_PASSWORD_CHANGE_FAILURE:
        case CREATE_PASSWORD_CHANGE_SUCCESS:
            return false;
        default:
            return state;
    }
};

export const passwordChangeReducer = combineReducers({
    isFetching: isFetchingReducer,
    inputs: inputsReducer
});

export default passwordChangeReducer;
