import { combineReducers } from "redux";
import { FETCH_CUSTOMER_SUCCESS } from "./actions";

const initState = {
    byId: {},
    allIds: []
};

const byIdReducer = (state = initState.byId, action) => {
    switch (action.type) {
        case FETCH_CUSTOMER_SUCCESS:
            return Object.assign({}, state, {
                [action.payload.customer.id]: action.payload.customer
            });
        default:
            return state;
    }
};

const allIdsReducer = (state = initState.allIds, action) => {
    switch (action.type) {
        case FETCH_CUSTOMER_SUCCESS:
            if (state.includes(action.payload.customer.id)) {
                return state;
            } else {
                return [...state, action.payload.customer.id];
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
