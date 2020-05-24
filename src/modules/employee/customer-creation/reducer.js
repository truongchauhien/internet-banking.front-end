import {
    CUSTOMER_CREATION_INPUT_CHANGE,
    CREATE_CUSTOMER_REQUEST, CREATE_CUSTOMER_FAILURE, CREATE_CUSTOMER_SUCCESS,
    CUSTOMER_CREATION_RESET
} from "./actions";
import { combineReducers } from "redux";

const initState = {
    inputs: {
        userName: '',
        password: '',
        fullName: '',
        email: '',
        phone: ''
    },
    createdCustomer: null,
    createdCurrentAccount: null,
    isCreating: false
};

const inputsReducer = (state = initState.inputs, action) => {
    switch (action.type) {
        case CUSTOMER_CREATION_INPUT_CHANGE:
            return Object.assign({}, state, { [action.payload.name]: action.payload.value });
        case CUSTOMER_CREATION_RESET:
            return initState.inputs;
        default:
            return state;
    }
};

const createdCustomerReducer = (state = initState.createdCustomer, action) => {
    switch (action.type) {
        case CREATE_CUSTOMER_SUCCESS:
            return action.payload.customer;
        case CUSTOMER_CREATION_RESET:
            return initState.createdCustomer;
        default:
            return state;
    }
};

const createdCurrentAccountReducer= (state = initState.createdCurrentAccount, action) => {
    switch (action.type) {
        case CREATE_CUSTOMER_SUCCESS:
            return action.payload.currentAccount;
        case CUSTOMER_CREATION_RESET:
            return initState.createdCurrentAccount;
        default:
            return state;
    }
};

const isCreatingReducer = (state = initState.isCreating, action) => {
    switch (action.type) {
        case CREATE_CUSTOMER_REQUEST:
            return true;
        case CREATE_CUSTOMER_FAILURE:
        case CREATE_CUSTOMER_SUCCESS:
        case CUSTOMER_CREATION_RESET:
            return false;
        default:
            return state;
    }
};

export const customerCreationReducer = combineReducers({
    inputs: inputsReducer,
    createdCustomer: createdCustomerReducer,
    createdCurrentAccount: createdCurrentAccountReducer,
    isCreating: isCreatingReducer
});

export default customerCreationReducer;
