import { combineReducers } from 'redux';
import { FETCH_CUSTOMER_SUCCESS } from '../../commons/entities/customers/actions';
import { SET_DEFAULT_CURRENT_ACCOUNT_SUCCESS } from './default-current-account/actions';
import closureRequestReducer from './closure-request/reducer';

const initState = {
    isFetching: false,
    defaultCurrentAccountId: -1
};

const isFetchingReducer = (state = initState.isFetching, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

const defaultCurrentAccountIdReducer = (state = initState.defaultCurrentAccountId, action) => {
    switch (action.type) {
        case FETCH_CUSTOMER_SUCCESS:
            return action.payload.customer.defaultCurrentAccountId;
        case SET_DEFAULT_CURRENT_ACCOUNT_SUCCESS:
            return action.payload.defaultCurrentAccountId;
        default:
            return state;
    }
};

export const accountsReducer = combineReducers({
    isFetching: isFetchingReducer,
    defaultCurrentAccountId: defaultCurrentAccountIdReducer,
    closureRequest: closureRequestReducer
});

export default accountsReducer;
