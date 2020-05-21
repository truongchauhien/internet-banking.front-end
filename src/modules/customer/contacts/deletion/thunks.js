import { deleteContactRequest, deleteContactFailure, deleteContactSuccess } from './actions';
import { deleteContact } from '../../../../commons/apis/contacts-api';

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
