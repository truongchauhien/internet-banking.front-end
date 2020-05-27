import {
    createIntrabankTransferRequest, createIntrabankTransferFailure, createIntrabankTransferSuccess,
    confirmIntrabankTransferRequest, confirmIntrabankTransferFailure, confirmIntrabankTransferSuccess
} from './actions';
import {
    createIntrabankTransfer, confirmIntrabankTransfer
} from '../../../../../commons/apis/transfer-api';
import { thunkedFetchAccount } from '../../../../commons/entities/accounts/thunks';

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
            if (!response.ok) return dispatch(createIntrabankTransferFailure(response.body));
            return dispatch(createIntrabankTransferSuccess(response.body));
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
export const thunkedConfirmIntrabankTransfer = (payload) => async (dispatch, getState) => {
    dispatch(confirmIntrabankTransferRequest());
    try {
        const response = await confirmIntrabankTransfer(payload);
        if (!response.ok) return dispatch(confirmIntrabankTransferFailure(response.body))
        const fromAccountNumber = getState().customer.transfers.intrabankInterbank.createdTransfer?.fromAccountNumber;
        if (fromAccountNumber) {
            await dispatch(thunkedFetchAccount({ identity: fromAccountNumber, identityType: 'accountNumber' }, { mode: 'append' }));
        }
        return dispatch(confirmIntrabankTransferSuccess());
    } catch (error) {
        console.log(error);
        return dispatch(confirmIntrabankTransferFailure());
    }
};
