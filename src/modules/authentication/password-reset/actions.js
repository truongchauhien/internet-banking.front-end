export const CREATE_PASSWORD_RESET_REQUEST = 'CREATE_PASSWORD_RESET_REQUEST';
export const CREATE_PASSWORD_RESET_FAILURE = 'CREATE_PASSWORD_RESET_FAILURE';
export const CREATE_PASSWORD_RESET_SUCCESS = 'CREATE_PASSWORD_RESET_SUCCESS';

export const createPasswordResetRequest = (payload) => ({
    type: CREATE_PASSWORD_RESET_REQUEST,
    payload
});

export const createPasswordResetFailure = (payload) => ({
    type: CREATE_PASSWORD_RESET_FAILURE,
    payload
});

export const createPasswordResetSuccess = (payload) => ({
    type: CREATE_PASSWORD_RESET_SUCCESS,
    payload
});

export const CONFIRM_PASSWORD_RESET_REQUEST = 'CONFIRM_PASSWORD_RESET_REQUEST';
export const CONFIRM_PASSWORD_RESET_FAILURE = 'CONFIRM_PASSWORD_RESET_FAILURE';
export const CONFIRM_PASSWORD_RESET_SUCCESS = 'CONFIRM_PASSWORD_RESET_SUCCESS';

export const confirmPasswordResetRequest = (payload) => ({
    type: CONFIRM_PASSWORD_RESET_REQUEST,
    payload
});

export const confirmPasswordResetFailure = (payload) => ({
    type: CONFIRM_PASSWORD_RESET_FAILURE,
    payload
});

export const confirmPasswordResetSuccess = (payload) => ({
    type: CONFIRM_PASSWORD_RESET_SUCCESS,
    payload
});
