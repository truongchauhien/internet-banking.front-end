import { combineReducers } from "redux";
import { convertArrayToObject } from "../../../commons/utils/array-utils";
import {
    FETCH_TRANSACTION_HISTORY_OF_CUSTOMER_REQUEST,
    FETCH_TRANSACTION_HISTORY_OF_CUSTOMER_FAILURE,
    FETCH_TRANSACTION_HISTORY_OF_CUSTOMER_SUCCESS
} from "./actions";

const initState = {
    byId: {},
    allIds: [],
    hasMore: false,
    isFetching: false,
    hasError: false,
};

const byIdReducer = (state = initState.byId, action) => {
    switch (action.type) {
        case FETCH_TRANSACTION_HISTORY_OF_CUSTOMER_SUCCESS:
            if (action.payload.isFirst) {
                return convertArrayToObject(action.payload.transactions, 'id');
            } else {
                return Object.assign({}, state, convertArrayToObject(action.payload.transactions, 'id'));
            }
        default:
            return state;
    }
};

const allIdsReducer = (state = initState.allIds, action) => {
    switch (action.type) {
        case FETCH_TRANSACTION_HISTORY_OF_CUSTOMER_SUCCESS:
            if (action.payload.isFirst) {
                return action.payload.transactions.map(transaction => transaction.id);
            } else {
                return [...state, ...action.payload.transactions.map(transaction => transaction.id)];
            }
        default:
            return state;
    }
};

const hasMoreReducer = (state = initState.hasMore, action) => {
    switch (action.type) {
        case FETCH_TRANSACTION_HISTORY_OF_CUSTOMER_SUCCESS:
            return action.payload.hasMore;
        default:
            return state;
    }
};

const isFetchingReducer = (state = initState.isFetching, action) => {
    switch (action.type) {
        case FETCH_TRANSACTION_HISTORY_OF_CUSTOMER_REQUEST:
            return true;
        case FETCH_TRANSACTION_HISTORY_OF_CUSTOMER_FAILURE:
        case FETCH_TRANSACTION_HISTORY_OF_CUSTOMER_SUCCESS:
            return false;
        default:
            return state;
    }
};

const hasErrorReducer = (state = initState.hasError, action) => {
    switch (action.type) {
        case FETCH_TRANSACTION_HISTORY_OF_CUSTOMER_REQUEST:
        case FETCH_TRANSACTION_HISTORY_OF_CUSTOMER_SUCCESS:
            return false;
        case FETCH_TRANSACTION_HISTORY_OF_CUSTOMER_FAILURE:
            return true;
        default:
            return state;
    }
};

export const transactionHistoryReducer = combineReducers({
    byId: byIdReducer,
    allIds: allIdsReducer,
    hasMore: hasMoreReducer,
    isFetching: isFetchingReducer,
    hasError: hasErrorReducer
});

export default transactionHistoryReducer;
