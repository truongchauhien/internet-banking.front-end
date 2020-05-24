import { combineReducers } from "redux";
import { DEPOSIT_CREATION_SUCCESS } from "../../../employee/deposit-creation/actions";
import { DEPOSIT_ADD } from "./actions";

const initState = {
    byId: {},
    allIds: []
};

const byIdReducer = (state = initState.byId, action) => {
    switch (action.type) {
        case DEPOSIT_ADD:
            if (action.meta?.mode === 'append') {
                return Object.assign({}, state, {
                    [action.payload.deposit.id]: action.payload.deposit
                });
            } else {
                return {
                    [action.payload.deposit.id]: action.payload.deposit
                };
            }
        default:
            return state;
    }
};

const allIdsReducer = (state = initState.allIds, action) => {
    switch (action.type) {
        case DEPOSIT_ADD:
            if (action.meta.mode === 'append') {
                return [...state, action.payload.deposit.id];
            } else {
                return [action.payload.deposit.id];
            }
        default:
            return state;
    }
};

export const depositsReducer = combineReducers({
    byId: byIdReducer,
    allIds: allIdsReducer
});

export default depositsReducer;
