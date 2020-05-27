import { combineReducers } from 'redux';
import { convertArrayToObject } from '../../../../commons/utils/array-utils';
import {
    FETCH_ACCOUNTS_SUCCESS,
    FETCH_ACCOUNT_SUCCESS
} from './actions';

const initState = {
    byId: {},
    allIds: []
};

const byIdReducer = (state = initState.byId, action) => {
    switch (action.type) {
        case FETCH_ACCOUNTS_SUCCESS:
            if (action.meta.mode === 'append') {
                return Object.assign({}, state, convertArrayToObject(action.payload.accounts, 'id'));
            } else {
                return convertArrayToObject(action.payload.accounts, 'id');
            }
        case FETCH_ACCOUNT_SUCCESS:
            if (action.meta.mode === 'append') {
                return Object.assign({}, state, {
                    [action.payload.account.id]: action.payload.account
                });
            } else {
                return {
                    [action.payload.account.id]: action.payload.account
                };
            }
        default:
            return state;
    }
};

const allIdsReducer = (state = initState.allIds, action) => {
    switch (action.type) {
        case FETCH_ACCOUNTS_SUCCESS:
            if (action.meta.mode === 'append') {
                return [...state, ...action.payload?.accounts?.map(item => item.id)];
            } else {
                return action.payload?.accounts?.map(item => item.id);
            }
        case FETCH_ACCOUNT_SUCCESS:
            if (action.meta.mode === 'append') {
                if (state.includes(action.payload.account.id)) return state;
                return [...state, action.payload.account.id];
            } else {
                return [action.payload.account.id];
            }
        default:
            return state;
    }
};

export const accountsReducer = combineReducers({
    byId: byIdReducer,
    allIds: allIdsReducer
});

export default accountsReducer;
