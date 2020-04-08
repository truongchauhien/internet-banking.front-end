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
