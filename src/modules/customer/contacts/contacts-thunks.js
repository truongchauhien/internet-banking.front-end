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
    createContactSuccess
} from './contacts-actions';
import {
    fetchContacts,
    deleteContact,
    patchContact,
    createContact
} from '../../../commons/apis/customers/contacts-api';

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

export const thunkedPatchContact = ({ contactId, payload }) => {
    return async (dispatch, getState) => {
        dispatch(patchContactRequest());
        try {
            const response = await patchContact({ contactId, ...payload });
            if (!response.ok) return dispatch(patchContactFailure());
            return dispatch(patchContactSuccess());
        } catch {
            return dispatch(patchContactFailure());
        }
    };
};

export const thunkedCreateContact = ({ ...payload }) => {
    return async (dispatch, getState) => {
        const temporaryIdentity = uuidv4();
        dispatch(createContactRequest({ postedContact: payload, id: temporaryIdentity }));
        try {
            const response = await createContact({ ...payload });
            if (!response.ok) return dispatch(createContactFailure({ id: temporaryIdentity }));

            const createdContact = response.body;
            return dispatch(createContactSuccess({ createdContact, id: temporaryIdentity }));
        } catch {
            return dispatch(patchContactFailure({ id: temporaryIdentity }));
        }
    };
};
