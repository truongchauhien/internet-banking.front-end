export const CREATE_PASSWORD_CHANGE_REQUEST = 'CREATE_PASSWORD_CHANGE_REQUEST';
export const CREATE_PASSWORD_CHANGE_FAILURE = 'CREATE_PASSWORD_CHANGE_FAILURE';
export const CREATE_PASSWORD_CHANGE_SUCCESS = 'CREATE_PASSWORD_CHANGE_SUCCESS';

export const createPasswordChangeRequest = (payload) => ({
    type: CREATE_PASSWORD_CHANGE_REQUEST,
    payload
});

export const createPasswordChangeFailure = (payload) => ({
    type: CREATE_PASSWORD_CHANGE_FAILURE,
    payload
});

export const createPasswordChangeSuccess = (payload) => ({
    type: CREATE_PASSWORD_CHANGE_SUCCESS,
    payload
});


export const PASSWORD_CHANGE_INPUT_CHANGE = 'PASSWORD_CHANGE_INPUT_CHANGE';
export const passwordChangeInputChange = (payload) => ({
    type: PASSWORD_CHANGE_INPUT_CHANGE,
    payload
});
