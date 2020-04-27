export const FETCH_DEBTS_REQUEST = 'FETCH_DEBTS_REQUEST';
export const FETCH_DEBTS_FAILURE = 'FETCH_DEBTS_FAILURE';
export const FETCH_DEBTS_SUCCESS = 'FETCH_DEBTS_SUCCESS';

export const fetchDebtsRequest = (payload) => ({
    type: FETCH_DEBTS_REQUEST,
    payload
});

export const fetchDebtsFailure = (payload) => ({
    type: FETCH_DEBTS_FAILURE,
    payload
});

export const fetchDebtsSuccess = (payload) => ({
    type: FETCH_DEBTS_SUCCESS,
    payload
});

export const FETCH_DEBT_REQUEST = 'FETCH_DEBT_REQUEST';
export const FETCH_DEBT_FAILURE = 'FETCH_DEBT_FAILURE';
export const FETCH_DEBT_SUCCESS = 'FETCH_DEBT_SUCCESS';

export const fetchDebtRequest = (payload) => ({
    type: FETCH_DEBTS_REQUEST,
    payload
});

export const fetchDebtFailure = (payload) => ({
    type: FETCH_DEBTS_FAILURE,
    payload
});

export const fetchDebtSuccess = (payload) => ({
    type: FETCH_DEBT_SUCCESS,
    payload
});

export const DEBT_CANCEL_REQUEST = 'DEBT_CANCEL_REQUEST';
export const DEBT_CANCEL_FAILURE = 'DEBT_CANCEL_FAILURE';
export const DEBT_CANCEL_SUCCESS = 'DEBT_CANCEL_SUCCESS';

export const debtCancelRequest = (payload) => ({
    type: DEBT_CANCEL_REQUEST,
    payload
});

export const debtCancelFailure = (payload) => ({
    type: DEBT_CANCEL_FAILURE,
    payload
});

export const debtCancelSuccess = (payload) => ({
    type: DEBT_CANCEL_SUCCESS,
    payload
});

export const FETCH_DEBTS_OPTION_CHANGE = 'FETCH_DEBTS_OPTION_CHANGE';

/**
 * 
 * @param {object} payload
 * @param {'newOnly'} payload.option
 * @param {any} payload.value
 */
export const fetchDebtsOptionChange = (payload) => ({
    type: FETCH_DEBTS_OPTION_CHANGE,
    payload
});
