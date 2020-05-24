import {
    fetchTransactionsRequest,
    fetchTransactionsFailure,
    fetchTransactionsSuccess
} from './actions';
import { fetchTransactions } from '../../../../commons/apis/transactions-api';

/**
 * 
 * @param {object} payload
 * @param {object} payload.accountId
 * @param {object} payload.startingAfter
 */
export const thunkedFetchTransactions = (payload) => async (dispatch, getState) => {
    dispatch(fetchTransactionsRequest());
    try {
        const response = await fetchTransactions(payload);
        if (!response.ok) return dispatch(fetchTransactionsFailure());
        const shouldMerge = payload.startingAfter !== null && payload.startingAfter !== undefined;
        return dispatch(fetchTransactionsSuccess({
            ...response.body,
            shouldMerge
        }));
    } catch (err) {
        console.log(err);
        return dispatch(fetchTransactionsFailure());
    }
};
