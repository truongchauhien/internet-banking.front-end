import { combineReducers } from "redux";
import { convertArrayToObject } from '../../../commons/utils/array-utils';
import {
    LINKED_BANKS_FETCH_SUCCESS
} from "./actions";

const initState = {
    byId: {},
    allIds: []
};

const byIdReducer = (state = initState.byId, action) => {
    switch (action.type) {
        case LINKED_BANKS_FETCH_SUCCESS:
            return convertArrayToObject(action.payload, 'id')
        default:
            return state;
    }
};

const allIdsReducer = (state = initState.allIds, action) => {
    switch (action.type) {
        case LINKED_BANKS_FETCH_SUCCESS:
            return action.payload.map(item => item.id);
        default:
            return state;
    }
};

export const linkedBanksReducer = combineReducers({
    byId: byIdReducer,
    allIds: allIdsReducer
});
