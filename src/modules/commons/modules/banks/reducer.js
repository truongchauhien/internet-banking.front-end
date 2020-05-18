import { combineReducers } from "redux";
import { convertArrayToObject } from '../../../../commons/utils/array-utils';
import {
    FETCH_BANKS_SUCCESS
} from "./actions";

const initState = {
    byId: {},
    allIds: []
};

const byIdReducer = (state = initState.byId, action) => {
    switch (action.type) {
        case FETCH_BANKS_SUCCESS:
            return convertArrayToObject(action.payload, 'id')
        default:
            return state;
    }
};

const allIdsReducer = (state = initState.allIds, action) => {
    switch (action.type) {
        case FETCH_BANKS_SUCCESS:
            return action.payload.map(item => item.id);
        default:
            return state;
    }
};

export const banksReducer = combineReducers({
    byId: byIdReducer,
    allIds: allIdsReducer
});

export default banksReducer;
