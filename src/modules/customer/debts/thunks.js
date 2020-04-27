import {
    fetchDebtsRequest,
    fetchDebtsFailure,
    fetchDebtsSuccess,
    debtCancelRequest,
    debtCancelFailure,
    debtCancelSuccess,
    fetchDebtRequest,
    fetchDebtFailure,
    fetchDebtSuccess
} from "./actions";
import { getDebts, cancelDebt, getDebt } from "../../../commons/apis/debt-api";

/**
 * 
 * @param {object} payload
 * @param {'sent'|'received'|'both'} payload.type
 * @param {number} payload.startingAfter
 * @param {boolean} payload.newOnly
 */
export const thunkedFetchDebts = (payload) => {
    return async (dispatch, getState) => {
        dispatch(fetchDebtsRequest());
        try {
            const response = await getDebts(payload);
            if (!response.ok) return fetchDebtsFailure();

            let shouldMergeResult = false;
            if (payload.startingAfter) {
                shouldMergeResult = true;
            }
            return dispatch(fetchDebtsSuccess({
                ...response.body,
                shouldMergeResult
            }));
        } catch (err) {
            return dispatch(fetchDebtsFailure());
        }
    };
};

/**
 * 
 * @param {object} payload
 * @param {'id'|'transferId'} payload.identityType
 * @param {number} payload.identityValue
 */
export const thunkedFetchDebt = (payload) => async (dispatch, getState) => {
    dispatch(fetchDebtRequest());
    try {
        const response = await getDebt(payload);
        if (!response.ok) return dispatch(fetchDebtFailure());
        return dispatch(fetchDebtSuccess(response.body.debt));
    } catch {
        return dispatch(fetchDebtFailure());
    }
};

/**
 * 
 * @param {object} payload
 * @param {number} payload.id
 * @param {string} payload.canceledReason
 */
export const thunkedCancelDebt = (payload) => {
    return async (dispatch, getState) => {
        dispatch(debtCancelRequest());
        try {
            const response = await cancelDebt(payload);
            if (!response.ok) return dispatch(debtCancelFailure());
            await dispatch(thunkedFetchDebt({
                identityType: 'id',
                identityValue: payload.id
            }));
            dispatch(debtCancelSuccess());
        } catch (err) {
            return dispatch(debtCancelFailure())
        }
    };
};
