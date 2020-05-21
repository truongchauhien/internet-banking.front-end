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
