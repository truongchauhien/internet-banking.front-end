import { depositCreationRequest, depositCreationFailure, depositCreationSuccess } from "./actions";
import { createDeposit } from '../../../commons/apis/deposits-api';

/**
 * 
 * @param {object} payload
 * @param {?string} payload.userName
 * @param {?string} payload.accountNumber
 * @param {number} payload.amount
 */
export const thunkedCreateDeposit = (payload) => async (dispatch, getState) => {
    dispatch(depositCreationRequest());
    try {
        const response = await createDeposit(payload);
        if (!response.ok) return dispatch(depositCreationFailure());
        return dispatch(depositCreationSuccess(response.body));
    } catch {
        dispatch(depositCreationFailure());
    }
};
