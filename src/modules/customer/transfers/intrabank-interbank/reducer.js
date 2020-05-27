import { combineReducers } from 'redux';
import {
    CREATE_INTRABANK_TRANSFER_REQUEST, CREATE_INTRABANK_TRANSFER_FAILURE, CREATE_INTRABANK_TRANSFER_SUCCESS,
    CONFIRM_INTRABANK_TRANSFER_REQUEST, CONFIRM_INTRABANK_TRANSFER_FAILURE, CONFIRM_INTRABANK_TRANSFER_SUCCESS
} from './intrabank/actions';
import {
    CREATE_INTERBANK_TRANSFER_REQUEST, CREATE_INTERBANK_TRANSFER_FAILURE, CREATE_INTERBANK_TRANSFER_SUCCESS,
    CONFIRM_INTERBANK_TRANSFER_REQUEST, CONFIRM_INTERBANK_TRANSFER_FAILURE, CONFIRM_INTERBANK_TRANSFER_SUCCESS
} from './interbank/actions';
import { CLEAR_INTRABANK_INTERBANK_TRANSFER } from './actions';

const initState = {
    stage: 'init',
    isFetching: false,
    error: null,
    createdTransfer: null
};

const stageReducer = (state = initState.stage, action) => {
    switch (action.type) {
        case CREATE_INTRABANK_TRANSFER_REQUEST:
        case CREATE_INTERBANK_TRANSFER_REQUEST:
            return 'create_transfer_request';
        case CREATE_INTRABANK_TRANSFER_FAILURE:
        case CREATE_INTERBANK_TRANSFER_FAILURE:
            return 'create_transfer_failure';
        case CREATE_INTRABANK_TRANSFER_SUCCESS:
        case CREATE_INTERBANK_TRANSFER_SUCCESS:
            return 'create_transfer_success';
        case CONFIRM_INTRABANK_TRANSFER_REQUEST:
        case CONFIRM_INTERBANK_TRANSFER_REQUEST:
            return 'confirm_transfer_request';
        case CONFIRM_INTRABANK_TRANSFER_FAILURE:
        case CONFIRM_INTERBANK_TRANSFER_FAILURE:
            return 'confirm_transfer_failure';
        case CONFIRM_INTRABANK_TRANSFER_SUCCESS:
        case CONFIRM_INTERBANK_TRANSFER_SUCCESS:
            return 'confirm_transfer_success';
        case CLEAR_INTRABANK_INTERBANK_TRANSFER:
            if (action.payload.stage) {
                return initState.stage
            } else {
                return state;
            }
        default:
            return state;
    }
};

const isFetchingReducer = (state = initState.isFetching, action) => {
    switch (action.type) {
        case CREATE_INTRABANK_TRANSFER_REQUEST:
        case CONFIRM_INTRABANK_TRANSFER_REQUEST:
        case CREATE_INTERBANK_TRANSFER_REQUEST:
        case CONFIRM_INTERBANK_TRANSFER_REQUEST:
            return true;
        case CREATE_INTRABANK_TRANSFER_FAILURE:
        case CREATE_INTRABANK_TRANSFER_SUCCESS:
        case CREATE_INTERBANK_TRANSFER_FAILURE:
        case CREATE_INTERBANK_TRANSFER_SUCCESS:
            return false;
        case CLEAR_INTRABANK_INTERBANK_TRANSFER:
            if (action.payload.isFetching) return initState.isFetching;
            return state;
        default:
            return state;
    }
};

const errorReducer = (state = initState.error, action) => {
    switch (action.type) {
        case CREATE_INTRABANK_TRANSFER_FAILURE:
        case CONFIRM_INTRABANK_TRANSFER_FAILURE:
        case CREATE_INTERBANK_TRANSFER_FAILURE:
        case CONFIRM_INTERBANK_TRANSFER_FAILURE:
            return action.payload?.error?.code || 'unknown';
        case CREATE_INTRABANK_TRANSFER_REQUEST:
        case CREATE_INTRABANK_TRANSFER_SUCCESS:
        case CONFIRM_INTRABANK_TRANSFER_REQUEST:
        case CONFIRM_INTRABANK_TRANSFER_SUCCESS:
        case CREATE_INTERBANK_TRANSFER_REQUEST:
        case CREATE_INTERBANK_TRANSFER_SUCCESS:
        case CONFIRM_INTERBANK_TRANSFER_REQUEST:
        case CONFIRM_INTERBANK_TRANSFER_SUCCESS:
            return null;
        case CLEAR_INTRABANK_INTERBANK_TRANSFER:
            if (action.payload.error) return initState.error;
            return state;
        default:
            return state;
    }
};

const createdTransferReducer = (state = initState.createdTransfer, action) => {
    switch (action.type) {
        case CREATE_INTRABANK_TRANSFER_SUCCESS:
        case CREATE_INTERBANK_TRANSFER_SUCCESS:
            return action.payload.transfer;
        case CLEAR_INTRABANK_INTERBANK_TRANSFER:
            if (action.payload.createdTransfer) return initState.createdTransfer;
            return state;
        default:
            return state;
    }
};

export const intrabankInterbankReducer = combineReducers({
    stage: stageReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
    createdTransfer: createdTransferReducer
});

export default intrabankInterbankReducer;
