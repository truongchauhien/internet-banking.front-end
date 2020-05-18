export const LOGIN_RESTORE_REQUEST = 'LOGIN_RESTORE_REQUEST';
export const LOGIN_RESTORE_FAILURE = 'LOGIN_RESTORE_FAILURE';
export const LOGIN_RESTORE_SUCCESS = 'LOGIN_RESTORE_SUCCESS';

export const loginRestoreRequest = (payload) => ({
    type: LOGIN_RESTORE_REQUEST,
    payload
});

export const loginRestoreFailure = (payload) => ({
    type: LOGIN_RESTORE_FAILURE,
    payload
});

export const loginRestoreSuccess = (payload) => ({
    type: LOGIN_RESTORE_SUCCESS,
    payload
});
