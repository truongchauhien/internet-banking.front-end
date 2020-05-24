export const QUERY_ACCOUNT_REQUEST = 'QUERY_ACCOUNT_REQUEST';
export const QUERY_ACCOUNT_FAILURE = 'QUERY_ACCOUNT_FAILURE';
export const QUERY_ACCOUNT_SUCCESS = 'QUERY_ACCOUNT_SUCCESS';

export const queryAccountRequest = (payload) => ({
    type: QUERY_ACCOUNT_REQUEST,
    payload
});

export const queryAccountFailure = (payload) => ({
    type: QUERY_ACCOUNT_FAILURE,
    payload
});

export const queryAccountSuccess = (payload) => ({
    type: QUERY_ACCOUNT_SUCCESS,
    payload
});

export const QUERY_ACCOUNT_INIT = 'QUERY_ACCOUNT_INIT';
export const queryAccountInit = (payload) => ({
    type: QUERY_ACCOUNT_INIT,
    payload
});
