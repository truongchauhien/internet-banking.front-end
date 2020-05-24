import { combineReducers } from "redux";
import {
    FETCH_TRANSACTIONS_SUCCESS,
    FETCH_TRANSACTIONS_FAILURE,
    FETCH_TRANSACTIONS_REQUEST
} from "../../commons/entities/transactions/actions";

const initState = {
    hasMore: false,
    isFetching: false,
    error: false,
};

const hasMoreReducer = (state = initState.hasMore, action) => {
    switch (action.type) {
        case FETCH_TRANSACTIONS_SUCCESS:
            return action.payload.hasMore || false;
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

const errorReducer = (state = initState.error, action) => {
    switch (action.type) {
        case FETCH_TRANSACTIONS_REQUEST:
        case FETCH_TRANSACTIONS_SUCCESS:
            return null;
        case FETCH_TRANSACTIONS_FAILURE:
            return action.payload && action.payload.error || 'unknown';
        default:
            return state;
    }
};

export const transactionHistoryReducer = combineReducers({
    isFetching: isFetchingReducer,
    hasMore: hasMoreReducer,
    error: errorReducer
});

export default transactionHistoryReducer;
