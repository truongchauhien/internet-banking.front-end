export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const loginRequest = () => {
    return {
        type: LOGIN_REQUEST
    };
};

/**
 * 
 * @param {*} payload 
 */
export const loginFailure = (payload) => {
    return {
        type: LOGIN_FAILURE
    };
};

/**
 * 
 * @param {object} payload 
 */
export const loginSuccess = (payload) => {
    return {
        type: LOGIN_SUCCESS,
        payload: payload
    };
};
