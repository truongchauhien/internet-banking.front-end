export const FETCH_TRANSACTION_HISTORY_OF_CUSTOMER_REQUEST = 'FETCH_TRANSACTION_HISTORY_OF_CUSTOMER_REQUEST';
export const FETCH_TRANSACTION_HISTORY_OF_CUSTOMER_FAILURE = 'FETCH_TRANSACTION_HISTORY_OF_CUSTOMER_FAILURE';
export const FETCH_TRANSACTION_HISTORY_OF_CUSTOMER_SUCCESS = 'FETCH_TRANSACTION_HISTORY_OF_CUSTOMER_SUCCESS';

export const fetchTransactionHistoryOfCustomerRequest = (payload) => ({
    type: FETCH_TRANSACTION_HISTORY_OF_CUSTOMER_REQUEST,
    payload
});

export const fetchTransactionHistoryOfCustomerFailure = (payload) => ({
    type: FETCH_TRANSACTION_HISTORY_OF_CUSTOMER_FAILURE,
    payload
});

export const fetchTransactionHistoryOfCustomerSuccess = (payload) => ({
    type: FETCH_TRANSACTION_HISTORY_OF_CUSTOMER_SUCCESS,
    payload
});
