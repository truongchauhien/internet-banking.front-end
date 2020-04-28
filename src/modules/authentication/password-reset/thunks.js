import {
    createPasswordResetRequest, createPasswordResetFailure, createPasswordResetSuccess,
    confirmPasswordResetRequest, confirmPasswordResetFailure, confirmPasswordResetSuccess
} from "./actions";
import { createPasswordReset, confirmPasswordReset } from "../../../commons/apis/authentication-api";

/**
 * 
 * @param {object} payload
 * @param {'customer'|'employee'|'administrator'} payload.userType
 * @param {string} payload.email
 */
export const thunkedCreatePasswordReset = (payload) => async (dispatch, getState) => {
    dispatch(createPasswordResetRequest());
    try {
        const response = await createPasswordReset(payload);
        if (!response.ok) return dispatch(createPasswordResetFailure());
        return dispatch(createPasswordResetSuccess());
    } catch {
        return dispatch(createPasswordResetFailure());
    }
};

/**
 * 
 * @param {object} payload
 * @param {'customer'|'employee'|'administrator'} payload.userType
 * @param {string} payload.email
 * @param {number} payload.otp
 * @param {string} payload.newPassword
 */
export const thunkedConfirmPasswordReset = (payload) => async (dispatch, getState) => {
    dispatch(confirmPasswordResetRequest());
    try {
        const response = await confirmPasswordReset(payload);
        if (!response.ok) return dispatch(confirmPasswordResetFailure());
        return dispatch(confirmPasswordResetSuccess());
    } catch {
        return dispatch(confirmPasswordResetFailure());
    }
};
