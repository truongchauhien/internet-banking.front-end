export const SET_DEFAULT_CURRENT_ACCOUNT_REQUEST = 'SET_DEFAULT_CURRENT_ACCOUNT_REQUEST';
export const SET_DEFAULT_CURRENT_ACCOUNT_FAILURE = 'SET_DEFAULT_CURRENT_ACCOUNT_FAILURE';
export const SET_DEFAULT_CURRENT_ACCOUNT_SUCCESS = 'SET_DEFAULT_CURRENT_ACCOUNT_SUCCESS';

export const setDefaultCurrentAccountRequest = (payload) => ({
    type: SET_DEFAULT_CURRENT_ACCOUNT_REQUEST,
    payload
});

export const setDefaultCurrentAccountFailure = (payload) => ({
    type: SET_DEFAULT_CURRENT_ACCOUNT_FAILURE,
    payload
});

export const setDefaultCurrentAccountSuccess = (payload) => ({
    type: SET_DEFAULT_CURRENT_ACCOUNT_SUCCESS,
    payload
});
