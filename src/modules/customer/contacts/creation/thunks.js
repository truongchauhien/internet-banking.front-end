import { v4 as uuidv4 } from 'uuid';
import {
    createContactRequest, createContactFailure, createContactSuccess,
    contactCreationInit
} from './actions';
import { createContact } from '../../../../commons/apis/contacts-api';

export const thunkedCreateContact = ({ ...payload }) => {
    return async (dispatch, getState) => {
        const tempId = uuidv4();
        dispatch(createContactRequest({ postedContact: payload, tempId: tempId }));
        try {
            const response = await createContact({ ...payload });
            if (!response.ok) return dispatch(createContactFailure({ tempId: tempId }));
            const createdContact = response.body;
            // Clear input field values if the creation is successful.
            dispatch(contactCreationInit());
            return dispatch(createContactSuccess({ createdContact, tempId: tempId }));
        } catch {
            return dispatch(createContactFailure({ tempId: tempId }));
        }
    };
};
