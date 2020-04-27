import {
    payDebtTransferCreateRequest,
    payDebtTransferCreateFailure,
    payDebtTransferCreateSuccess,
    payDebtTransferConfirmRequest,
    payDebtTransferConfirmFailure,
    payDebtTransferConfirmSuccess
} from "./actions";
import {
    createPayDebtTransfer,
    confirmPayDebtTransfer
} from "../../../../commons/apis/transfer-api";
import {
    thunkedFetchDebt
} from '../../debts/thunks';

/**
 * 
 * @param {object} payload
 * @param {number} payload.debtId
 */
export const thunkedCreatePayDebtTransfer = (payload) => async (dispatch, getState) => {
    dispatch(payDebtTransferCreateRequest({ debtId: payload.debtId }));
    try {
        const response = await createPayDebtTransfer(payload);
        if (!response.ok) return dispatch(payDebtTransferCreateFailure());
        await dispatch(thunkedFetchDebt({
            identityType: 'id',
            identityValue: payload.debtId
        }));
        return dispatch(payDebtTransferCreateSuccess({
            debtId: payload.debtId,
            createdTransfer: response.body.transfer
        }));
    } catch {
        return dispatch(payDebtTransferCreateFailure());
    }
};

/**
 * 
 * @param {object} payload
 * @param {object} payload.transferId
 * @param {object} payload.otp
 */
export const thunkedConfirmPayDebtTransfer = (payload) => async (dispatch, getState) => {
    dispatch(payDebtTransferConfirmRequest());
    try {
        const response = await confirmPayDebtTransfer(payload);
        if (!response.ok) return dispatch(payDebtTransferConfirmFailure());
        await dispatch(thunkedFetchDebt({
            identityType: 'transferId',
            identityValue: payload.transferId
        }));
        return dispatch(payDebtTransferConfirmSuccess());
    } catch {
        return dispatch(payDebtTransferConfirmFailure());
    }
};
