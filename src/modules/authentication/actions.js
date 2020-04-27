export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const loginRequest = (payload) => {
    return {
        type: LOGIN_REQUEST,
        payload: payload
    };
};

export const loginFailure = (payload) => {
    return {
        type: LOGIN_FAILURE,
        payload: payload
    };
};

export const loginSuccess = (payload) => {
    return {
        type: LOGIN_SUCCESS,
        payload: payload
    };
};

export const LOGOUT = 'LOGOUT';
export const logout = (payload) => ({
    type: LOGOUT,
    payload
});

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
