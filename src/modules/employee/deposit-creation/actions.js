export const DEPOSIT_CREATION_REQUEST = 'DEPOSIT_CREATION_REQUEST';
export const DEPOSIT_CREATION_FAILURE = 'DEPOSIT_CREATION_FAILURE';
export const DEPOSIT_CREATION_SUCCESS = 'DEPOSIT_CREATION_SUCCESS';

export const depositCreationRequest = (payload) => ({
    type: DEPOSIT_CREATION_REQUEST,
    payload
});

export const depositCreationFailure = (payload) => ({
    type: DEPOSIT_CREATION_FAILURE,
    payload
});

export const depositCreationSuccess = (payload) => ({
    type: DEPOSIT_CREATION_SUCCESS,
    payload
});

export const DEPOSIT_CREATION_CLEAR = 'DEPOSIT_CREATION_CLEAR';
/**
 * 
 * @param {object} payload
 * @param {boolean} payload.customerId
 * @param {boolean} payload.accountId
 * @param {boolean} payload.createdDepositId
 */
export const depositCreationClear = (payload) => ({
    type: DEPOSIT_CREATION_CLEAR,
    payload
});
