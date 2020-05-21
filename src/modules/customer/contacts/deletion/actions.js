export const DELETE_CONTACT_REQUEST = 'DELETE_CONTACT_REQUEST';
export const DELETE_CONTACT_FAILURE = 'DELETE_CONTACT_FAILURE';
export const DELETE_CONTACT_SUCCESS = 'DELETE_CONTACT_SUCCESS';

export const deleteContactRequest = (payload) => ({
    type: DELETE_CONTACT_REQUEST,
    payload
});

export const deleteContactFailure = (payload) => ({
    type: DELETE_CONTACT_FAILURE,
    payload
});

export const deleteContactSuccess = (payload) => ({
    type: DELETE_CONTACT_SUCCESS,
    payload
});
