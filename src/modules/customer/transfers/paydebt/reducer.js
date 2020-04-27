import { combineReducers } from "redux";
import { PAYDEBT_TRANSFER_CREATE_SUCCESS, PAYDEBT_TRANSFER_CONFIRM_REQUEST, PAYDEBT_TRANSFER_CREATE_REQUEST } from "./actions";

const initState = {
    createdTransfer: null
};

const createdTransferReducer = (state = initState.createdTransfer, action) => {
    switch (action.type) {
        case PAYDEBT_TRANSFER_CREATE_REQUEST:
            return null;
        case PAYDEBT_TRANSFER_CREATE_SUCCESS:
            return action.payload.createdTransfer;
        default:
            return state;
    }
};

export const payDebtReducer = combineReducers({
    createdTransfer: createdTransferReducer
});

export default payDebtReducer;
