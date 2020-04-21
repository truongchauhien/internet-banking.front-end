export const FECTH_CONTACTS_REQUEST = 'FECTH_CONTACTS_REQUEST';
export const FECTH_CONTACTS_FAILURE = 'FETCH_CONTACTS_FAILURE';
export const FECTH_CONTACTS_SUCCESS = 'FETCH_CONTACTS_SUCCESS';

export const fetchContactsRequest = (payload) => {
    return {
        type: FECTH_CONTACTS_REQUEST,
        payload
    };
};

export const fetchContactsFailure = (payload) => {
    return {
        type: FECTH_CONTACTS_FAILURE,
        payload
    };
};

export const fetchContactsSuccess = (payload) => {
    return {
        type: FECTH_CONTACTS_SUCCESS,
        payload
    };
};

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

export const PATCH_CONTACT_REQUEST = 'PATCH_CONTACT_REQUEST'
export const PATCH_CONTACT_FAILURE = 'PATCH_CONTACT_FAILURE'
export const PATCH_CONTACT_SUCCESS = 'PATCH_CONTACT_SUCCESS'

export const patchContactRequest = (payload) => ({
    type: PATCH_CONTACT_REQUEST,
    payload
});

export const patchContactFailure = (payload) => ({
    type: PATCH_CONTACT_FAILURE,
    payload
});

export const patchContactSuccess = (payload) => ({
    type: PATCH_CONTACT_SUCCESS,
    payload
});

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
export const contactCreationInit = (payload) => ({
    type: CONTACT_CREATION_INIT,
    payload
});

export const CONTACT_CREATION_INPUT_CHANGE = 'CONTACT_CREATION_INPUT_CHANGE';

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

export const CONTACT_CREATION_MODAL_OPEN_STATUS_CHANGE = 'CONTACT_CREATION_MODAL__OPEN_STATUS_CHANGE';

/**
 * 
 * @param {boolean} payload
 */
export const contactCreationModalOpenStatusChange = (payload) => ({
    type: CONTACT_CREATION_MODAL_OPEN_STATUS_CHANGE,
    payload
});

export const CONTACT_MODIFICATION_INPUT_CHANGE = 'CONTACT_MODIFICATION_INPUT_CHANGE';

export const contactModificationInputChange = (payload) => ({
    type: CONTACT_MODIFICATION_INPUT_CHANGE,
    payload
});

export const CONTACT_MODIFICATION_MODAL_OPEN_STATUS_CHANGE = 'CONTACT_MODIFICATION_MODAL_OPEN_STATUS_CHANGE';
export const contactModificationModalOpenStatusChange = (payload) => ({
    type: CONTACT_MODIFICATION_MODAL_OPEN_STATUS_CHANGE,
    payload
});

export const CONTACT_MODIFICATION_INIT = 'CONTACT_MODIFICATION_INIT';

/**
 * 
 * @param {object} payload
 * @param {number} payload.id,
 * @param {string} payload.name,
 * @param {number} payload.bankId,
 * @param {string} payload.accountNumber
 */
export const contactModificationInit = (payload) => ({
    type: CONTACT_MODIFICATION_INIT,
    payload
});
