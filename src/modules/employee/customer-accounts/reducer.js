import { combineReducers } from 'redux';
import { FETCH_CUSTOMER_SUCCESS } from '../../commons/entities/customers/actions';
import accountCreationReducer from './creation/reducer';
import { CUSTOMER_ACCOUNT_CREATION_CLEAR } from './creation/actions';

const initState = {
    customerId: null
};

const customerIdReducer = (state = initState.customerId, action) => {
    switch (action.type) {
        case FETCH_CUSTOMER_SUCCESS:
            return action.payload.customer.id;
        case CUSTOMER_ACCOUNT_CREATION_CLEAR:
            if (action.payload.clearCustomer) {
                return initState.customerId;
            } else {
                return state;
            }
        default:
            return state;
    }
};

export const customerAccountsReducer = combineReducers({
    customerId: customerIdReducer,
    creation: accountCreationReducer
});

export default customerAccountsReducer;
