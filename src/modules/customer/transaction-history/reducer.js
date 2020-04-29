import { combineReducers } from "redux";
import { FETCH_TRANSACTIONS_REQUEST, FETCH_TRANSACTIONS_FAILURE, FETCH_TRANSACTIONS_SUCCESS } from "./actions";
import { convertArrayToObject } from "../../../commons/utils/array-utils";

const initState = {
    byId: {},
    allIds: [],
    hasMore: false,
    isFetching: false
};

const byIdReducer = (state = initState.byId, action) => {
    switch (action.type) {
        case FETCH_TRANSACTIONS_SUCCESS:
            if (action.payload.shouldMerge) {
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
        case FETCH_TRANSACTIONS_SUCCESS:
            if (action.payload.shouldMerge) {
                return [...state, ...action.payload.transactions.map(transaction => transaction.id)];
            } else {
                return action.payload.transactions.map(transaction => transaction.id);
            }
        default:
            return state;
    }
};

const hasMoreReducer = (state = initState.hasMore, action) => {
    switch (action.type) {
        case FETCH_TRANSACTIONS_SUCCESS:
            return action.payload.hasMore;
        default:
            return state;
    }
};

const isFetchingReducer = (state = initState.isFetching, action) => {
    switch (action.type) {
        case FETCH_TRANSACTIONS_REQUEST:
            return true;
        case FETCH_TRANSACTIONS_FAILURE:
        case FETCH_TRANSACTIONS_SUCCESS:
            return false;
        default:
            return state;
    }
};

export const transactionsReducer = combineReducers({
    byId: byIdReducer,
    allIds: allIdsReducer,
    hasMore: hasMoreReducer,
    isFetching: isFetchingReducer
});

export default transactionsReducer;
