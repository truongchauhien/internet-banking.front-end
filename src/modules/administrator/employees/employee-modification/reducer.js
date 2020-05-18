import {
    EMPLOYEE_MODIFICATION_INIT,
    EMPLOYEE_MODIFICATION_MODAL_INPUT_CHANGE,
    EMPLOYEE_MODIFICATION_MODAL_OPEN_STATUS_CHANGE,
    UPDATE_EMPLOYEE_REQUEST, UPDATE_EMPLOYEE_FAILURE, UPDATE_EMPLOYEE_SUCCESS
} from "./actions";
import { combineReducers } from "redux";

const initState = {
    isModalOpen: false,
    fields: {
        id: null,
        userName: '',
        password: '',
        fullName: '',
        email: ''
    },
    isFetching: false
};

const isModalOpenReducer = (state = initState.isModalOpen, action) => {
    switch (action.type) {
        case EMPLOYEE_MODIFICATION_MODAL_OPEN_STATUS_CHANGE:
            return action.payload;
        case UPDATE_EMPLOYEE_SUCCESS:
            return false;
        default:
            return state;
    }
};

const fieldsReducer = (state = initState.fields, action) => {
    switch (action.type) {
        case EMPLOYEE_MODIFICATION_MODAL_INPUT_CHANGE:
            if (action.payload === null) {
                return initState.fields;
            } else if (Array.isArray(action.payload)) {
                const inputs = {};
                for (const input of action.payload) {
                    inputs[input.name] = input.value;
                }
                return Object.assign({}, state, inputs);
            } else {
                return Object.assign({}, state, { [action.payload.name]: action.payload.value });
            }
        case EMPLOYEE_MODIFICATION_INIT:
            return action.payload.fields;
        default:
            return state;
    }
};

const isFetchingReducer = (state = initState.isFetching, action) => {
    switch (action.type) {
        case UPDATE_EMPLOYEE_REQUEST:
            return true;
        case UPDATE_EMPLOYEE_FAILURE:
        case UPDATE_EMPLOYEE_SUCCESS:
            return false;
        default:
            return state;
    }
};

export const employeeModificationReducer = combineReducers({
    isModalOpen: isModalOpenReducer,
    fields: fieldsReducer,
    isFetching: isFetchingReducer
});
