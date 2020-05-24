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

export const fetchCustomerSuccess = (payload) => ({
    type: FETCH_CUSTOMER_SUCCESS,
    payload
});
