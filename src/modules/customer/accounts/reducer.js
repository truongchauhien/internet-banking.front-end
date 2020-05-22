import { combineReducers } from 'redux';
import { convertArrayToObject } from '../../../commons/utils/array-utils';
import {
    FECTH_ACCOUNTS_REQUEST,
    FETCH_ACCOUNTS_SUCCESS,
    FETCH_ACCOUNTS_FAILURE
} from './actions';
import { FETCH_CUSTOMER_SUCCESS } from '../actions';
import closureRequestReducer from './closure-request/reducer';

const initState = {
    byId: {},
    allIds: [],
    defaultCurrentAccountId: -1
};

const byIdReducer = (state = initState.byId, action) => {
    switch (action.type) {
        case FETCH_ACCOUNTS_SUCCESS:
            return convertArrayToObject(action.payload, 'id');
        default:
            return state;
    }
};

const allIdsReducer = (state = initState.allIds, action) => {
    switch (action.type) {
        case FETCH_ACCOUNTS_SUCCESS:
            return action.payload.map(item => item.id);
        default:
            return state;
    }
};

const defaultCurrentAccountIdReducer = (state = -1, action) => {
    switch (action.type) {
        case FETCH_CUSTOMER_SUCCESS:
            return action.payload.customer.defaultCurrentAccountId;
        default:
            return state;
    }
};

export const accountsReducer = combineReducers({
    byId: byIdReducer,
    allIds: allIdsReducer,
    defaultCurrentAccountId: defaultCurrentAccountIdReducer,
    closureRequest: closureRequestReducer
});

export default accountsReducer;
