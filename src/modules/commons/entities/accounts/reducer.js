import { combineReducers } from 'redux';
import { convertArrayToObject } from '../../../../commons/utils/array-utils';
import {
    FECTH_ACCOUNTS_REQUEST,
    FETCH_ACCOUNTS_SUCCESS,
    FETCH_ACCOUNTS_FAILURE
} from './actions';
import { CREATE_CUSTOMER_ACCOUNT_SUCCESS } from '../../../employee/customer-accounts/creation/actions';

const initState = {
    byId: {},
    allIds: []
};

const byIdReducer = (state = initState.byId, action) => {
    switch (action.type) {
        case FETCH_ACCOUNTS_SUCCESS:
            return convertArrayToObject(action.payload, 'id');
        case CREATE_CUSTOMER_ACCOUNT_SUCCESS:
            return Object.assign({}, state, {
                [action.payload.account.id]: action.payload.account
            });
        default:
            return state;
    }
};

const allIdsReducer = (state = initState.allIds, action) => {
    switch (action.type) {
        case FETCH_ACCOUNTS_SUCCESS:
            return action.payload.map(item => item.id);
        case CREATE_CUSTOMER_ACCOUNT_SUCCESS:
            return [...state, action.payload.account.id];
        default:
            return state;
    }
};

export const accountsReducer = combineReducers({
    byId: byIdReducer,
    allIds: allIdsReducer
});

export default accountsReducer;
