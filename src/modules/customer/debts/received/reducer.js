import { combineReducers } from "redux";
import {
    PAYDEBT_TRANSFER_CREATE_REQUEST,
    PAYDEBT_TRANSFER_CREATE_FAILURE,
    PAYDEBT_TRANSFER_CREATE_SUCCESS,
    PAYDEBT_TRANSFER_CONFIRM_FAILURE,
    PAYDEBT_TRANSFER_CONFIRM_SUCCESS
} from "../../transfers/paydebt/actions";

const initState = {
    doingTransferForDebtId: null
};

const doingTransferForDebtIdReducer = (state = initState.doingTransferForDebtId, action) => {
    switch (action.type) {
        case PAYDEBT_TRANSFER_CREATE_SUCCESS:
            return action.payload.debtId;
        case PAYDEBT_TRANSFER_CREATE_FAILURE:
        case PAYDEBT_TRANSFER_CONFIRM_SUCCESS:
            return null;
        default:
            return state;
    }
};

export const receivedReducer = combineReducers({
    doingTransferForDebtId: doingTransferForDebtIdReducer
});

export default receivedReducer;
