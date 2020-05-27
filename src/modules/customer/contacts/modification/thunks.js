import { patchContactRequest, patchContactFailure, patchContactSuccess } from './actions';
import { patchContact } from '../../../../commons/apis/contacts-api';

export const thunkedPatchContact = ({ id, ...payload }) => {
    return async (dispatch, getState) => {
        dispatch(patchContactRequest());
        try {
            const response = await patchContact({ id, ...payload });
            if (!response.ok) return dispatch(patchContactFailure());
            return dispatch(patchContactSuccess(response.body));
        } catch {
            return dispatch(patchContactFailure());
        }
    };
};
