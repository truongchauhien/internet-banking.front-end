import {
    CUSTOMER_CREATION_INPUT_CHANGE,
    CREATE_CUSTOMER_REQUEST, CREATE_CUSTOMER_FAILURE, CREATE_CUSTOMER_SUCCESS,
    CUSTOMER_CREATION_CLEAR
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
    createdCustomerId: null,
    createdCurrentAccountId: null,
    isFetching: false
};

const inputsReducer = (state = initState.inputs, action) => {
    switch (action.type) {
        case CUSTOMER_CREATION_INPUT_CHANGE:
            return Object.assign({}, state, { [action.payload.name]: action.payload.value });
        case CUSTOMER_CREATION_CLEAR:
            return initState.inputs;
        default:
            return state;
    }
};

const createdCustomerIdReducer = (state = initState.createdCustomerId, action) => {
    switch (action.type) {
        case CREATE_CUSTOMER_SUCCESS:
            return action.payload.customer.id;
        case CUSTOMER_CREATION_CLEAR:
            if (action.payload.createdCustomerId) {
                return initState.createdCustomerId;
            } else {
                return state;
            }
        default:
            return state;
    }
};

const createdCurrentAccountIdReducer = (state = initState.createdCurrentAccountId, action) => {
    switch (action.type) {
        case CREATE_CUSTOMER_SUCCESS:
            return action.payload.account.id;
        case CUSTOMER_CREATION_CLEAR:
            if (action.payload.createdCurrentAccountId) {
                return initState.createdCurrentAccountId;
            } else {
                return state;
            }
        default:
            return state;
    }
};

const isFetchingReducer = (state = initState.isFetching, action) => {
    switch (action.type) {
        case CREATE_CUSTOMER_REQUEST:
            return true;
        case CREATE_CUSTOMER_FAILURE:
        case CREATE_CUSTOMER_SUCCESS:
            return false;
        default:
            return state;
    }
};

export const customerCreationReducer = combineReducers({
    inputs: inputsReducer,
    createdCustomerId: createdCustomerIdReducer,
    createdCurrentAccountId: createdCurrentAccountIdReducer,
    isFetching: isFetchingReducer
});

export default customerCreationReducer;
