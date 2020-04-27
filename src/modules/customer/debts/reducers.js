import { combineReducers } from "redux";
import { convertArrayToObject } from '../../../commons/utils/array-utils';
import {
    FETCH_DEBTS_SUCCESS,
    FETCH_DEBT_SUCCESS,
    FETCH_DEBTS_OPTION_CHANGE,
    DEBT_CANCEL_REQUEST
} from "./actions";
import receivedReducer from "./received/reducer";

const initState = {
    byId: {},
    allIds: [],
    hasMore: false,
    fetchOptions: {
        newOnly: false
    }
};

export const byIdReducer = (state = initState.byId, action) => {
    switch (action.type) {
        case FETCH_DEBTS_SUCCESS:
            if (action.payload.shouldMergeResult) {
                return Object.assign({}, state, convertArrayToObject(action.payload.debts, 'id'));
            }
            else {
                return convertArrayToObject(action.payload.debts, 'id');
            }                
        case FETCH_DEBT_SUCCESS:
            return Object.assign({}, state, {
                [action.payload.id]: action.payload
            });
        default:
            return state;
    }
};

export const allIdsReducer = (state = initState.allIds, action) => {
    switch (action.type) {
        case FETCH_DEBTS_SUCCESS:
            if (action.payload.shouldMergeResult)
                return [...state, ...action.payload.debts.map(debt => debt.id)];
            else
                return action.payload.debts.map(debt => debt.id);
        default:
            return state;
    }
};

export const hasMoreReducer = (state = initState.hasMore, action) => {
    switch (action.type) {
        case FETCH_DEBTS_SUCCESS:
            return action.payload.hasMore
        default:
            return state;
    }
};

export const fetchOptionsReducer = (state = initState.fetchOptions, action) => {
    switch (action.type) {
        case FETCH_DEBTS_OPTION_CHANGE:
            return Object.assign({}, state, {
                [action.payload.option]: action.payload.value
            });
        default:
            return state;
    }
};

export const debtsReducer = combineReducers({
    byId: byIdReducer,
    allIds: allIdsReducer,
    hasMore: hasMoreReducer,
    fetchOptions: fetchOptionsReducer,
    received: receivedReducer
});

export default debtsReducer;
