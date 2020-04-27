import {
    createIntrabankTransferRequest, createIntrabankTransferFailure, createIntrabankTransferSuccess,
    confirmIntrabankTransferRequest, confirmIntrabankTransferFailure, confirmIntrabankTransferSuccess
} from './actions';
import {
    createIntrabankTransfer, confirmIntrabankTransfer
} from '../../../../commons/apis/transfer-api';

/**
 * 
 * @param {object} payload
 * @param {string} payload.fromAccountNumber
 * @param {string} payload.toAccountNumber
 * @param {number} payload.amount
 * @param {string} payload.message
 * @param {string} payload.whoPayFee
 */
export const thunkedCreateIntrabankTransfer = (payload) => {
    return async (dispatch, getState) => {
        dispatch(createIntrabankTransferRequest(payload));
        try {
            const response = await createIntrabankTransfer(payload);
            if (!response.ok) return dispatch(createIntrabankTransferFailure());
            return dispatch(createIntrabankTransferSuccess(response.body.transfer));
        } catch {
            return dispatch(createIntrabankTransferFailure());
        }
    };
};

/**
 * 
 * @param {object} payload
 * @param {string} payload.otp
 * @param {number} payload.transferId
 */
export const thunkedConfirmIntrabankTransfer = (payload) => {
    return async (dispatch, getState) => {
        dispatch(confirmIntrabankTransferRequest());
        try {
            const response = await confirmIntrabankTransfer(payload);
            if (!response.ok) {
                return dispatch(confirmIntrabankTransferFailure(response.body))
            }
            return dispatch(confirmIntrabankTransferSuccess());
        } catch {
            return dispatch(confirmIntrabankTransferFailure());
        }
    };
};
