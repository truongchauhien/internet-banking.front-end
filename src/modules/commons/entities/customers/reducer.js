import { combineReducers } from "redux";
import { FETCH_CUSTOMER_SUCCESS } from "./actions";

const initState = {
    byId: {},
    allIds: []
};

const byIdReducer = (state = initState.byId, action) => {
    switch (action.type) {
        case FETCH_CUSTOMER_SUCCESS:
            if (action?.meta?.mode === 'append') {
                return Object.assign({}, state, {
                    [action.payload.customer.id]: action.payload.customer
                });
            } else {
                return {
                    [action.payload.customer.id]: action.payload.customer
                }
            }
        default:
            return state;
    }
};

const allIdsReducer = (state = initState.allIds, action) => {
    switch (action.type) {
        case FETCH_CUSTOMER_SUCCESS:
            if (action?.meta?.mode === 'append') {
                return [...state, action.payload.customer.id];
            }
            else {
                return [action.payload.customer.id]
            }
        default:
            return state;
    }
};

export const customersReducer = combineReducers({
    byId: byIdReducer,
    allIds: allIdsReducer
});

export default customersReducer;
