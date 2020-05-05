import { fetchTransactionHistoryOfCustomerRequest, fetchTransactionHistoryOfCustomerFailure, fetchTransactionHistoryOfCustomerSuccess } from "./actions";
import { fetchTransactions } from "../../../commons/apis/transactions-api";

/**
 * 
 * @param {object} payload
 * @param {string} payload.userName
 * @param {number} payload.startingAfter
 */
export const thunkedFetchTransactionHistory = (payload) => async (dispatch, getState) => {
    dispatch(fetchTransactionHistoryOfCustomerRequest());
    try {
        const response = await fetchTransactions(payload);
        if (!response.ok) return dispatch(fetchTransactionHistoryOfCustomerFailure());
        return dispatch(fetchTransactionHistoryOfCustomerSuccess({
            isFirst: payload.startingAfter === null || payload.startingAfter === undefined,
            ...response.body
        }));
    } catch {
        return dispatch(fetchTransactionHistoryOfCustomerFailure());
    }
};
