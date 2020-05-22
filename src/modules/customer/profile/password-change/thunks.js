import { createPasswordChangeRequest, createPasswordChangeFailure, createPasswordChangeSuccess } from "./actions";
import { updateCustomerPassword } from "../../../../commons/apis/customers-api";

/**
 * 
 * @param {object} payload
 * @param {number} payload.customerId
 * @param {string} payload.oldPassword
 * @param {string} payload.newPassword
 */
export const thunkedCreatePasswordChange = (payload) => async (dispatch, getState) => {
    dispatch(createPasswordChangeRequest())
    try {
        const response = await updateCustomerPassword(payload);
        if (!response.ok) return dispatch(createPasswordChangeFailure());
        return dispatch(createPasswordChangeSuccess());
    } catch {
        return dispatch(createPasswordChangeFailure());
    }
};
