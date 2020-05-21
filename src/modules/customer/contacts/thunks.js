import {
    fetchContactsRequest,
    fetchContactsFailure,
    fetchContactsSuccess,
} from './actions';
import {
    fetchContacts
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
