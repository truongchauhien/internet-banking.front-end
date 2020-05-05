export const CREATE_CUSTOMER_REQUEST = 'CREATE_CUSTOMER_REQUEST';
export const CREATE_CUSTOMER_FAILURE = 'CREATE_CUSTOMER_FAILURE';
export const CREATE_CUSTOMER_SUCCESS = 'CREATE_CUSTOMER_SUCCESS';

export const createCustomerRequest = (payload) => ({
    type: CREATE_CUSTOMER_REQUEST,
    payload
});

export const createCustomerFailure = (payload) => ({
    type: CREATE_CUSTOMER_FAILURE,
    payload
});

export const createCustomerSuccess = (payload) => ({
    type: CREATE_CUSTOMER_SUCCESS,
    payload
});

export const CUSTOMER_CREATION_INPUT_CHANGE = 'CUSTOMER_CREATION_INPUT_CHANGE';
export const customerCreationInputChange = (payload) => ({
    type: CUSTOMER_CREATION_INPUT_CHANGE,
    payload
});

export const CUSTOMER_CREATION_RESET =  'CUSTOMER_CREATION_RESET';
export const customerCreationReset = (payload) => ({
    type: CUSTOMER_CREATION_RESET,
    payload
});
