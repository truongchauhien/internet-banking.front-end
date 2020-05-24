import { combineReducers } from "redux";
import { FETCH_TRANSACTIONS_REQUEST, FETCH_TRANSACTIONS_FAILURE, FETCH_TRANSACTIONS_SUCCESS } from "../../commons/entities/transactions/actions";
import { convertArrayToObject } from "../../../commons/utils/array-utils";

const initState = {
    hasMore: false,
    isFetching: false
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
    hasMore: hasMoreReducer,
    isFetching: isFetchingReducer
});

export default transactionsReducer;
