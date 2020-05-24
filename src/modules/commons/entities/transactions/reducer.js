import { combineReducers } from 'redux';
import { FETCH_TRANSACTIONS_SUCCESS, TRANSACTIONS_INIT } from './actions';
import { convertArrayToObject } from '../../../../commons/utils/array-utils';

const initState = {
    byId: {},
    allIds: []
};

const byIdReducer = (state = initState.byId, action) => {
    switch (action.type) {
        case TRANSACTIONS_INIT:
            return initState.byId;
        case FETCH_TRANSACTIONS_SUCCESS:
            if (action.meta.mode === 'append') {
                return Object.assign({}, state, convertArrayToObject(action.payload.transactions, 'id'));
            } else {
                return convertArrayToObject(action.payload.transactions, 'id');
            }
        default:
            return state;
    }
};

const allIdsReducer = (state = initState.allIds, action) => {
    switch (action.type) {
        case TRANSACTIONS_INIT:
            return initState.allIds;
        case FETCH_TRANSACTIONS_SUCCESS:
            if (action.meta.mode === 'append') {
                return [...state, ...action.payload.transactions.map(transaction => transaction.id)];
            } else {
                return action.payload.transactions.map(transaction => transaction.id);
            }
        default:
            return state;
    }
};

export const transactionsReducer = combineReducers({
    byId: byIdReducer,
    allIds: allIdsReducer
});

export default transactionsReducer;
