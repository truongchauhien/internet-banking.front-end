export const FETCH_CUSTOMER_REQUEST = 'FETCH_CUSTOMER_REQUEST';
export const FECTH_CUSTOMER_FAILURE = 'FECTH_CUSTOMER_FAILURE';
export const FETCH_CUSTOMER_SUCCESS = 'FETCH_CUSTOMER_SUCCESS';

export const fetchCustomerRequest = (payload) => ({
    type: FETCH_CUSTOMER_REQUEST,
    payload
});

export const fetchCustomerFailure = (payload) => ({
    type: FECTH_CUSTOMER_FAILURE,
    payload
});

/**
 * 
 * @param {object} payload
 * @param {object} payload.customer
 * @param {object} meta
 * @param {'append'|'truncate'} meta.mode
 */
export const fetchCustomerSuccess = (payload, meta) => ({
    type: FETCH_CUSTOMER_SUCCESS,
    payload,
    meta: meta || {}
});

export const CUSTOMERS_INIT = 'CUSTOMERS_INIT';
export const customerInit = (payload) => ({
    type: CUSTOMERS_INIT,
    payload
});
