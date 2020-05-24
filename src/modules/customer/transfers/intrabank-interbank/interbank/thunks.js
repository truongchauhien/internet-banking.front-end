import {
    createInterbankTransferRequest, createInterbankTransferFailure, createInterbankTransferSuccess,
    confirmInterbankTransferRequest, confirmInterbankTransferFailure, confirmInterbankTransferSuccess
} from './actions';
import {
    createInterbankTransfer, confirmInterbankTransfer
} from '../../../../../commons/apis/transfer-api';

/**
 * 
 * @param {object} payload
 * @param {string} payload.fromAccountNumber
 * @param {string} payload.toAccountNumber
 * @param {number} payload.toBankId
 * @param {number} payload.amount
 * @param {string} payload.message
 * @param {string} payload.whoPayFee
 */
export const thunkedCreateInterbankTransfer = (payload) => {
    return async (dispatch, getState) => {
        dispatch(createInterbankTransferRequest(payload));
        try {
            const response = await createInterbankTransfer(payload);
            console.log(response);
            if (!response.ok) return dispatch(createInterbankTransferFailure());
            return dispatch(createInterbankTransferSuccess(response.body.transfer));
        } catch {
            return dispatch(createInterbankTransferFailure());
        }
    };
};

/**
 * 
 * @param {object} payload
 * @param {string} payload.otp
 * @param {number} payload.transferId
 */
export const thunkedConfirmInterbankTransfer = (payload) => {
    return async (dispatch, getState) => {
        dispatch(confirmInterbankTransferRequest());
        try {
            const response = await confirmInterbankTransfer(payload);
            if (!response.ok) return dispatch(confirmInterbankTransferFailure(response.body))
            return dispatch(confirmInterbankTransferSuccess());
        } catch {
            return dispatch(confirmInterbankTransferFailure());
        }
    };
};
