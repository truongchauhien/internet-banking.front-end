import { combineReducers } from "redux";
import { EMPLOYEE_CREATION_MODAL_INPUT_CHANGE, EMPLOYEE_CREATION_MODAL_OPEN_STATUS_CHANGE, EMPLOYEE_CREATION_INIT, CREATE_EMPLOYEE_SUCCESS, CREATE_EMPLOYEE_REQUEST, CREATE_EMPLOYEE_FAILURE } from "./actions";

const initState = {
    isModalOpen: false,
    fields: {
        userName: '',
        password: '',
        fullName: '',
        email: ''
    },
    isFetching: false
}

const isModalOpenReducer = (state = initState.isModalOpen, action) => {
    switch (action.type) {
        case EMPLOYEE_CREATION_MODAL_OPEN_STATUS_CHANGE:
            return action.payload;
        case CREATE_EMPLOYEE_SUCCESS:
            return false;
        default:
            return state;
    }
};

const fieldsReducer = (state = initState.fields, action) => {
    switch (action.type) {
        case EMPLOYEE_CREATION_INIT:
            return initState.fields;
        case EMPLOYEE_CREATION_MODAL_INPUT_CHANGE:
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
        default:
            return state;
    }
};

const isFetchingReducer = (state = initState.isFetching, action) => {
    switch (action.type) {
        case CREATE_EMPLOYEE_REQUEST:
            return true;
        case CREATE_EMPLOYEE_FAILURE:
        case CREATE_EMPLOYEE_SUCCESS:
            return false;
        default:
            return state;
    }
};

export const employeeCreationReducer = combineReducers({
    isModalOpen: isModalOpenReducer,
    fields: fieldsReducer,
    isFetching: isFetchingReducer
});

export default employeeCreationReducer;
