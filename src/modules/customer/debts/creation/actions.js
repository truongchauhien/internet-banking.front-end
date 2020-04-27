export const CREATE_DEBT_REQUEST = 'CREATE_DEBT_REQUEST';
export const CREATE_DEBT_FAILURE = 'CREATE_DEBT_FAILURE';
export const CREATE_DEBT_SUCCESS = 'CREATE_DEBT_SUCCESS';

export const createDebtRequest = (payload) => ({
    type: CREATE_DEBT_REQUEST,
    payload
});

export const createDebtFailure = (payload) => ({
    type: CREATE_DEBT_FAILURE,
    payload
});

export const createDebtSuccess = (payload) => ({
    type: CREATE_DEBT_SUCCESS,
    payload
});
