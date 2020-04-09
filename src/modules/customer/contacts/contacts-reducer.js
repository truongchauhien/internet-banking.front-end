'use strict'
import {
    FECTH_CONTACTS_REQUEST,
    FECTH_CONTACTS_FAILURE,
    FECTH_CONTACTS_SUCCESS,
    PATCH_CONTACT_REQUEST,
    PATCH_CONTACT_FAILURE,
    PATCH_CONTACT_SUCCESS,
    DELETE_CONTACT_REQUEST,
    DELETE_CONTACT_FAILURE,
    DELETE_CONTACT_SUCCESS,
    CREATE_CONTACT_REQUEST,
    CREATE_CONTACT_FAILURE,
    CREATE_CONTACT_SUCCESS
} from './contacts-actions';

const initState = [];

const handleFetchContactsRequest = (state, action) => {
    return [];
};

const handleFetchContactsFailure = (state, action) => {
    return [];
};

const handleFetchContactsSuccess = (state, action) => {
    return [...action.payload];
};

const handlePatchContactRequest = (state, action) => {
    return state;
};

const handlePatchContactFailure = (state, action) => {
    return state;
};

const handlePatchContactSuccess = (state, action) => {
    return state;
};

const handleDeleteContactRequest = (state, action) => {
    return state;
};

const handleDeleteContactFailure = (state, action) => {
    return state;
};

const handleDeleteContactSuccess = (state, action) => {
    const deletedId = action.payload.id;
    return state.filter((contact, index) => contact.id !== deletedId);
};

const handleCreateContactRequest = (state, action) => {
    const postedContact = { ...action.payload.postedContact, id: action.payload.id };
    return [...state, postedContact];
};

const handleCreateContactFailure = (state, action) => {
    const temporaryIdentity = action.payload.id;
    const filteredState = state.filter(
        (contact, index) => contact.id !== temporaryIdentity
    );
    return [...filteredState];
};

const handleCreateContactSuccess = (state, action) => {
    const temporaryIdentity = action.payload.id;
    const createdContact = action.payload.createdContact;
    const changedState = state.map((contact, index) => {
        if (contact.id !== temporaryIdentity) {
            return contact;
        }

        return createdContact;
    });

    return changedState;
};

export const contactsReducer = (state = initState, action) => {
    switch (action.type) {
        case FECTH_CONTACTS_REQUEST:
            return handleFetchContactsRequest(state, action);
        case FECTH_CONTACTS_FAILURE:
            return handleFetchContactsFailure(state, action);
        case FECTH_CONTACTS_SUCCESS:
            return handleFetchContactsSuccess(state, action);
        case PATCH_CONTACT_REQUEST:
            return handlePatchContactRequest(state, action);
        case PATCH_CONTACT_FAILURE:
            return handlePatchContactFailure(state, action);
        case PATCH_CONTACT_SUCCESS:
            return handlePatchContactSuccess(state, action);
        case DELETE_CONTACT_REQUEST:
            return handleDeleteContactRequest(state, action);
        case DELETE_CONTACT_FAILURE:
            return handleDeleteContactFailure(state, action);
        case DELETE_CONTACT_SUCCESS:
            return handleDeleteContactSuccess(state, action);
        case CREATE_CONTACT_REQUEST:
            return handleCreateContactRequest(state, action);
        case CREATE_CONTACT_FAILURE:
            return handleCreateContactFailure(state, action);
        case CREATE_CONTACT_SUCCESS:
            return handleCreateContactSuccess(state, action);
        default:
            return state;
    }
};

export default contactsReducer;
