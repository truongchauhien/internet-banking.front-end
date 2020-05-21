export const CREATE_CONTACT_REQUEST = 'CREATE_CONTACT_REQUEST';
export const CREATE_CONTACT_FAILURE = 'CREATE_CONTACT_FAILURE';
export const CREATE_CONTACT_SUCCESS = 'CREATE_CONTACT_SUCCESS';

export const createContactRequest = (payload) => ({
    type: CREATE_CONTACT_REQUEST,
    payload
});

export const createContactFailure = (payload) => ({
    type: CREATE_CONTACT_FAILURE,
    payload
});

export const createContactSuccess = (payload) => ({
    type: CREATE_CONTACT_SUCCESS,
    payload
});

export const CONTACT_CREATION_INIT = 'CONTACT_CREATION_INIT';
export const CONTACT_CREATION_INPUT_CHANGE = 'CONTACT_CREATION_INPUT_CHANGE';
export const CONTACT_CREATION_MODAL_OPEN_STATUS_CHANGE = 'CONTACT_CREATION_MODAL__OPEN_STATUS_CHANGE';

export const contactCreationInit = (payload) => ({
    type: CONTACT_CREATION_INIT,
    payload
});
/**
 * 
 * @param {object} payload
 * @param {string} payload.field
 * @param {string} payload.value
 */
export const contactCreationInputChange = (payload) => ({
    type: CONTACT_CREATION_INPUT_CHANGE,
    payload
});

/**
 * 
 * @param {boolean} payload
 */
export const contactCreationModalOpenStatusChange = (payload) => ({
    type: CONTACT_CREATION_MODAL_OPEN_STATUS_CHANGE,
    payload
});
