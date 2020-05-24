import { combineReducers } from "redux";
import { QUERY_ACCOUNT_REQUEST, QUERY_ACCOUNT_FAILURE, QUERY_ACCOUNT_SUCCESS, QUERY_ACCOUNT_INIT } from "./actions";

const initState = {
    whoAndWhere: {
        accountNumber: null,
        bankId: null
    },
    isFetching: false,
    result: {
        holderName: null
    }
};

const whoAndWhereReducer = (state = initState.whoAndWhere, action) => {
    switch (action.type) {
        case QUERY_ACCOUNT_INIT:
            return initState.whoAndWhere;
        case QUERY_ACCOUNT_REQUEST:
            return action.payload;
        default:
            return state;
    }
}

const isFetchingReducer = (state = initState.isFetching, action) => {
    switch (action.type) {
        case QUERY_ACCOUNT_REQUEST:
            return true;
        case QUERY_ACCOUNT_INIT:
        case QUERY_ACCOUNT_FAILURE:
        case QUERY_ACCOUNT_SUCCESS:
            return false;
        default:
            return state;
    }
};

const resultReducer = (state = initState.result, action) => {
    switch (action.type) {
        case QUERY_ACCOUNT_INIT:
        case QUERY_ACCOUNT_FAILURE:
            return initState.result;
        case QUERY_ACCOUNT_SUCCESS:
            return {
                holderName: action.payload.account.fullName || action.payload.account.holderName
            };
        default:
            return state;
    }
}

export const queryReducer = combineReducers({
    whoAndWhere: whoAndWhereReducer,
    isFetching: isFetchingReducer,
    result: resultReducer
});

export default queryReducer;
