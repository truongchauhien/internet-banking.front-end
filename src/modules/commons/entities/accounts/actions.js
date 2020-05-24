export const FECTH_ACCOUNTS_REQUEST = 'FECTH_ACCOUNTS_REQUEST';
export const FETCH_ACCOUNTS_SUCCESS = 'FETCH_ACCOUNTS_SUCCESS';
export const FETCH_ACCOUNTS_FAILURE = 'FETCH_ACCOUNTS_FAILURE';

export const fetchAccountsRequest = (payload) => ({
    type: FECTH_ACCOUNTS_REQUEST,
    payload
});

export const fetchAccountsFailure = (payload) => ({
    type: FETCH_ACCOUNTS_FAILURE,
    payload
});

/**
 * 
 * @param {object} payload
 * @param {Array} payload.accouts
 * @param {object} meta
 * @param {'truncate'|'append'} meta.mode
 */
export const fetchAccountsSuccess = (payload, meta) => ({
    type: FETCH_ACCOUNTS_SUCCESS,
    payload,
    meta: meta || {}
});

export const FETCH_ACCOUNT_REQUEST = 'FETCH_ACCOUNT_REQUEST';
export const FETCH_ACCOUNT_FAILURE = 'FETCH_ACCOUNT_FAILURE';
export const FETCH_ACCOUNT_SUCCESS = 'FETCH_ACCOUNT_SUCCESS';

export const fetchAccountRequest = (payload) => ({
    type: FETCH_ACCOUNT_REQUEST,
    payload
});

export const fetchAccountFailure = (payload) => ({
    type: FETCH_ACCOUNT_FAILURE,
    payload
});

/**
 * 
 * @param {object} payload
 * @param {object} payload.account
 * @param {object} meta
 * @param {'append'|'truncate'} meta.mode
 */
export const fetchAccountSuccess = (payload, meta) => ({
    type: FETCH_ACCOUNT_SUCCESS,
    payload,
    meta: meta || {}
});
