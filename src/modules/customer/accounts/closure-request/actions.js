export const ACCOUNT_CLOSURE_REQUEST_INITIALIZE = 'ACCOUNT_CLOSURE_REQUEST_INITIALIZE';
/**
 * 
 * @param {object} payload
 * @param {object} payload.closedAccountId
 */
export const accountClosureRequestInitialize = (payload) => ({
    type: ACCOUNT_CLOSURE_REQUEST_INITIALIZE,
    payload
});

export const CLOSURE_REQUEST_MODAL_OPEN_STATUS_CHANGE = 'CLOSURE_REQUEST_MODAL_OPEN_STATUS_CHANGE';
/**
 * 
 * @param {boolean} payload
 */
export const closureRequestModalOpenStatusChange = (payload) => ({
    type: CLOSURE_REQUEST_MODAL_OPEN_STATUS_CHANGE,
    payload
});

export const CLOSURE_REQUEST_MODAL_INPUT_CHANGE = 'CLOSURE_REQUEST_MODAL_INPUT_CHANGE';
/**
 * 
 * @param {object} payload
 * @param {string} payload.name
 * @param {any} payload.value
 */
export const closureRequestModalInputChange = (payload) => ({
    type: CLOSURE_REQUEST_MODAL_INPUT_CHANGE,
    payload
});

export const CLOSE_ACCOUNT_REQUEST = 'CLOSE_ACCOUNT_REQUEST';
export const CLOSE_ACCOUNT_FAILURE = 'CLOSE_ACCOUNT_FAILURE';
export const CLOSE_ACCOUNT_SUCCESS = 'CLOSE_ACCOUNT_SUCCESS';

export const closeAccountRequest = (payload) => ({
    type: CLOSE_ACCOUNT_REQUEST,
    payload
});

export const closeAccountFailure = (payload) => ({
    type: CLOSE_ACCOUNT_FAILURE,
    payload
});

export const closeAccountSuccess = (payload) => ({
    type: CLOSE_ACCOUNT_SUCCESS,
    payload
});
