export const FETCH_TRANSACTIONS_REQUEST = 'FETCH_TRANSACTIONS_REQUEST';
export const FETCH_TRANSACTIONS_FAILURE = 'FETCH_TRANSACTIONS_FAILURE';
export const FETCH_TRANSACTIONS_SUCCESS = 'FETCH_TRANSACTIONS_SUCCESS';

export const fetchTransactionsRequest = (payload) => ({
    type: FETCH_TRANSACTIONS_REQUEST,
    payload
});

export const fetchTransactionsFailure = (payload) => ({
    type: FETCH_TRANSACTIONS_FAILURE,
    payload
});

/**
 * 
 * @param {object} payload
 * @param {Array} payload.transactions
 * @param {Array} payload.hasMore
 * @param {object} meta
 * @param {'append'|'truncate'} meta.mode
 */
export const fetchTransactionsSuccess = (payload, meta) => ({
    type: FETCH_TRANSACTIONS_SUCCESS,
    payload,
    meta: meta || {}
});

export const TRANSACTIONS_INIT = 'TRANSACTIONS_INIT';
export const transactionsInit = (payload) => ({
    type: TRANSACTIONS_INIT,
    payload
});
