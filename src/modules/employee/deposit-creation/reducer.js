import { combineReducers } from "redux";
import {
    DEPOSIT_CREATION_REQUEST, DEPOSIT_CREATION_FAILURE, DEPOSIT_CREATION_SUCCESS,
    DEPOSIT_CREATION_CLEAR
} from "./actions";
import { FETCH_CUSTOMER_SUCCESS } from "../../commons/entities/customers/actions";
import { FETCH_ACCOUNT_SUCCESS } from "../../commons/entities/accounts/actions";

const initState = {
    isFetching: false,
    customerId: null,
    accountId: null,
    error: null,
    createdDepositId: null
};

const isFetchingReducer = (state = initState.isFetching, action) => {
    switch (action.type) {
        case DEPOSIT_CREATION_REQUEST:
            return true;
        case DEPOSIT_CREATION_FAILURE:
        case DEPOSIT_CREATION_SUCCESS:
            return false;
        default:
            return state;
    }
};

const customerIdReducer = (state = initState.customerId, action) => {
    switch (action.type) {
        case FETCH_CUSTOMER_SUCCESS:
            return action.payload.customer.id;
        case FETCH_ACCOUNT_SUCCESS:
            return action.payload.account.customerId;
        case DEPOSIT_CREATION_CLEAR:
            if (action.payload.customerId) {
                return initState.customerId;
            } else {
                return state;
            }

        default:
            return state;
    }
};

const accountIdReducer = (state = initState.accountId, action) => {
    switch (action.type) {
        case FETCH_ACCOUNT_SUCCESS:
            return action.payload.account.id;
        case DEPOSIT_CREATION_CLEAR:
            if (action.payload.accountId) {
                return initState.accountId;
            } else {
                return state;
            }
        default:
            return state;
    }
};

const errorReducer = (state = initState.error, action) => {
    switch (action.type) {
        case DEPOSIT_CREATION_REQUEST:
        case DEPOSIT_CREATION_SUCCESS:
            return false;
        case DEPOSIT_CREATION_FAILURE:
            return true;
        default:
            return state;
    }
};

const createdDepositIdReducer = (state = initState.createdDepositId, action) => {
    switch (action.type) {
        case DEPOSIT_CREATION_CLEAR:
            if (action.payload.createdDepositId) {
                return initState.createdDepositId;
            } else {
                return state;
            }
        case DEPOSIT_CREATION_SUCCESS:
            return action.payload.deposit.id;
        default:
            return state;
    }
};

export const depositCreationReducer = combineReducers({
    isCreating: isFetchingReducer,
    customerId: customerIdReducer,
    accountId: accountIdReducer,
    error: errorReducer,
    createdDepositId: createdDepositIdReducer
});

export default depositCreationReducer;
