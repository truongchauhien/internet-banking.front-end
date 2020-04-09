import {
    FECTH_ACCOUNTS_REQUEST,
    FETCH_ACCOUNTS_SUCCESS,
    FETCH_ACCOUNTS_FAILURE
} from './account-actions';
import { combineReducers } from 'redux';
import { convertArrayToObject } from '../../../commons/utils/array-utils';

const initState = {
    byId: {},
    allIds: []
};

const byIdReducer = (state = initState.byId, action) => {
    switch (action.type) {
        case FETCH_ACCOUNTS_SUCCESS:
            return convertArrayToObject(action.payload, 'id');
        default:
            return state;
    }
};

const allIdsReducer = (state = initState.allIds, action) => {
    switch (action.type) {
        case FETCH_ACCOUNTS_SUCCESS:
            return action.payload.map(item => item.id);
        default:
            return state;
    }
};

export const accountsReducer = combineReducers({
    byId: byIdReducer,
    allIds: allIdsReducer
});

export default accountsReducer;
