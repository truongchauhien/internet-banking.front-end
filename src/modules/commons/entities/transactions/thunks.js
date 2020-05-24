import {
    fetchTransactionsRequest,
    fetchTransactionsFailure,
    fetchTransactionsSuccess
} from './actions';
import { fetchTransactions } from '../../../../commons/apis/transactions-api';

/**
 * 
 * @param {object} payload
 * @param {?number} payload.accountId
 * @param {?string} payload.userName
 * @param {number} payload.startingAfter
 * @param {object} meta
 * @param {'append'|'truncate'} meta.mode
 */
export const thunkedFetchTransactions = (payload, meta) => async (dispatch, getState) => {
    try {
        const response = await fetchTransactions(payload);
        if (!response.ok) return dispatch(fetchTransactionsFailure());
        return dispatch(fetchTransactionsSuccess(response.body, {
            mode: meta?.mode || 'truncate'
        }));
    } catch (error) {
        console.error(error);
        return dispatch(fetchTransactionsFailure());
    }
};
