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

export const fetchTransactionsSuccess = (payload) => ({
    type: FETCH_TRANSACTIONS_SUCCESS,
    payload
});
