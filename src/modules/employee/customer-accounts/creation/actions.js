export const CREATE_CUSTOMER_ACCOUNT_REQUEST = 'CREATE_CUSTOMER_ACCOUNT_REQUEST';
export const CREATE_CUSTOMER_ACCOUNT_FAILURE = 'CREATE_CUSTOMER_ACCOUNT_FAILURE';
export const CREATE_CUSTOMER_ACCOUNT_SUCCESS = 'CREATE_CUSTOMER_ACCOUNT_SUCCESS';

export const createCustomerAccountRequest = (payload) => ({
    type: CREATE_CUSTOMER_ACCOUNT_REQUEST,
    payload
});

export const createCustomerAccountFailure = (payload) => ({
    type: CREATE_CUSTOMER_ACCOUNT_FAILURE,
    payload
});

export const createCustomerAccountSuccess = (payload) => ({
    type: CREATE_CUSTOMER_ACCOUNT_SUCCESS,
    payload
});

export const CUSTOMER_ACCOUNT_CREATION_CLEAR = 'CUSTOMER_ACCOUNT_CREATION_CLEAR';
/**
 * 
 * @param {object} payload
 * @param {boolean} payload.clearCustomer
 * @param {boolean} payload.clearAccount
 */
export const customerAccountCreationClear = (payload) => ({
    type: CUSTOMER_ACCOUNT_CREATION_CLEAR,
    payload
});
