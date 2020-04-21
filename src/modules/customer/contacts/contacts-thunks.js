import { v4 as uuidv4 } from 'uuid';

import {
    fetchContactsRequest,
    fetchContactsFailure,
    fetchContactsSuccess,
    deleteContactRequest,
    deleteContactFailure,
    deleteContactSuccess,
    patchContactRequest,
    patchContactFailure,
    patchContactSuccess,
    createContactRequest,
    createContactFailure,
    createContactSuccess,
    contactCreationInit
} from './contacts-actions';
import {
    fetchContacts,
    deleteContact,
    patchContact,
    createContact
} from '../../../commons/apis/contacts-api';

export const thunkedFetchContacts = () => {
    return async (dispatch, getState) => {
        dispatch(fetchContactsRequest());
        try {
            const response = await fetchContacts();
            if (!response.ok) return dispatch(fetchContactsFailure());
            return dispatch(fetchContactsSuccess(response.body.contacts));
        } catch {
            return dispatch(fetchContactsFailure());
        }
    };
};

export const thunkedDeleteContact = ({ id }) => {
    return async (dispatch, getState) => {
        dispatch(deleteContactRequest());
        try {
            const response = await deleteContact({ id: id });
            if (!response.ok) return dispatch(deleteContactFailure());
            return dispatch(deleteContactSuccess({ id: id }));
        } catch (err) {
            return dispatch(deleteContactFailure());
        }
    };
};

export const thunkedPatchContact = ({ id, ...payload }) => {
    return async (dispatch, getState) => {
        dispatch(patchContactRequest());
        try {
            const response = await patchContact({ id, ...payload });
            if (!response.ok) return dispatch(patchContactFailure());
            return dispatch(patchContactSuccess({
                id,
                ...payload
            }));
        } catch {
            return dispatch(patchContactFailure());
        }
    };
};

export const thunkedCreateContact = ({ ...payload }) => {
    return async (dispatch, getState) => {
        const tempId = uuidv4();
        dispatch(createContactRequest({ postedContact: payload, tempId: tempId }));
        try {
            const response = await createContact({ ...payload });
            if (!response.ok) return dispatch(createContactFailure({ tempId: tempId }));
            const createdContact = response.body;
            dispatch(contactCreationInit());
            return dispatch(createContactSuccess({ createdContact, tempId: tempId }));
        } catch {
            return dispatch(patchContactFailure({ tempId: tempId }));
        }
    };
};
