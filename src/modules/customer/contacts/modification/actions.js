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

export const CONTACT_MODIFICATION_INIT = 'CONTACT_MODIFICATION_INIT';
export const CONTACT_MODIFICATION_INPUT_CHANGE = 'CONTACT_MODIFICATION_INPUT_CHANGE';
export const CONTACT_MODIFICATION_MODAL_OPEN_STATUS_CHANGE = 'CONTACT_MODIFICATION_MODAL_OPEN_STATUS_CHANGE';

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

export const contactModificationInputChange = (payload) => ({
    type: CONTACT_MODIFICATION_INPUT_CHANGE,
    payload
});

export const contactModificationModalOpenStatusChange = (payload) => ({
    type: CONTACT_MODIFICATION_MODAL_OPEN_STATUS_CHANGE,
    payload
});

