import { combineReducers } from "redux";
import _ from 'lodash';
import {
    FETCH_RECONCILIATIONS_REQUEST, FETCH_RECONCILIATIONS_SUCCESS, FETCH_RECONCILIATIONS_FAILURE,
    DELETE_RECONCILIATION_REQUEST, DELETE_RECONCILIATION_FAILURE, DELETE_RECONCILIATION_SUCCESS,
    CREATE_RECONCILIATION_REQUEST, CREATE_RECONCILIATION_FAILURE, CREATE_RECONCILIATION_SUCCESS
} from "./actions";
import { RECEIVE_UPDATE_VIA_WEBSOCKET } from "../../commons/websocket/actions";
import { convertArrayToObject } from "../../../commons/utils/array-utils";

const initState = {
    byId: {},
    allIds: [],
    isFetching: false
}

const byIdReducer = (state = initState.byId, action) => {
    switch (action.type) {
        case FETCH_RECONCILIATIONS_SUCCESS:
            return convertArrayToObject(action.payload.reconciliations, 'id');
        case CREATE_RECONCILIATION_SUCCESS:
            return { [action.payload.reconciliation.id]: action.payload.reconciliation, ...state };
        case RECEIVE_UPDATE_VIA_WEBSOCKET:
            if (action.payload.entity === 'reconciliation') {
                return _.merge({}, state, {
                    [action.payload.updates.id]: action.payload.updates
                });
            } else {
                return state;
            }
        case DELETE_RECONCILIATION_SUCCESS:
            const newState = { ...state };
            delete newState[action.payload.id];
            return newState;
        default:
            return state;
    }
};

const allIdsReducer = (state = initState.allIds, action) => {
    switch (action.type) {
        case FETCH_RECONCILIATIONS_SUCCESS:
            return action.payload.reconciliations.map(reconciliation => reconciliation.id);
        case CREATE_RECONCILIATION_SUCCESS:
            return [action.payload.reconciliation.id, ...state];
        case DELETE_RECONCILIATION_SUCCESS:
            return state.filter(id => id !== action.payload.id);
        default:
            return state;
    }
};

const isFetchingReducer = (state = initState.isFetching, action) => {
    switch (action.type) {
        case FETCH_RECONCILIATIONS_REQUEST:
        case CREATE_RECONCILIATION_REQUEST:
        case DELETE_RECONCILIATION_REQUEST:
            return true;
        case FETCH_RECONCILIATIONS_FAILURE:
        case FETCH_RECONCILIATIONS_SUCCESS:
        case CREATE_RECONCILIATION_FAILURE:
        case CREATE_RECONCILIATION_SUCCESS:
        case DELETE_RECONCILIATION_FAILURE:
        case DELETE_RECONCILIATION_SUCCESS:
            return false;
        default:
            return state;
    }
};

export const transfersReducer = combineReducers({
    byId: byIdReducer,
    allIds: allIdsReducer,
    isFetching: isFetchingReducer
});

export default transfersReducer;
