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
    stage: 'input-information',
    createdTransfer: null
};

const stageReducer = (state = initState.stage, action) => {
    switch (action.type) {
        case CREATE_INTRABANK_TRANSFER_REQUEST:
        case CREATE_INTERBANK_TRANSFER_REQUEST:
            return 'creating-transfer';
        case CREATE_INTRABANK_TRANSFER_FAILURE:
        case CREATE_INTERBANK_TRANSFER_FAILURE:
            return 'failed-to-create-transfer';
        case CREATE_INTRABANK_TRANSFER_SUCCESS:
        case CREATE_INTERBANK_TRANSFER_SUCCESS:
            return 'transfer-created';
        case CONFIRM_INTRABANK_TRANSFER_REQUEST:
        case CONFIRM_INTERBANK_TRANSFER_REQUEST:
            return 'confirming-transfer';
        case CONFIRM_INTRABANK_TRANSFER_FAILURE:
        case CONFIRM_INTERBANK_TRANSFER_FAILURE:
            if (!action.payload) {
                return 'failed-to-confirm-transfer';
            }

            if (action.payload.code === 'INCORRECT_OTP') {
                return 'transfer-created';
            } else {
                return 'failed-to-confirm-transfer';
            }
        case CONFIRM_INTRABANK_TRANSFER_SUCCESS:
        case CONFIRM_INTERBANK_TRANSFER_SUCCESS:
            return 'transfer-confirmed';
        case CLEAR_INTRABANK_INTERBANK_TRANSFER:
        case CLEAR_INTRABANK_INTERBANK_TRANSFER:
            return 'input-information';
        default:
            return state;
    }
};

const createdTransferReducer = (state = initState.createdTransfer, action) => {
    switch (action.type) {
        case CREATE_INTRABANK_TRANSFER_SUCCESS:
        case CREATE_INTERBANK_TRANSFER_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};

export const intrabankInterbankReducer = combineReducers({
    stage: stageReducer,
    createdTransfer: createdTransferReducer
});

export default intrabankInterbankReducer;
