import { updateEmployeeRequest, updateEmployeeFailure, updateEmployeeSuccess } from "./actions";
import { updateEmployee } from "../../../../commons/apis/employees-api";

/**
 * 
 * @param {object} payload
 * @param {number} payload.id
 * @param {?string} payload.userName
 * @param {?string} payload.password
 * @param {?string} payload.fullName
 * @param {?string} payload.email
 */
export const thunkedUpdateEmployee = (payload) => async (dispatch, getState) => {
    dispatch(updateEmployeeRequest());
    try {
        const response = await updateEmployee(
            payload.password === '' || payload.password === null ?
                _.omit(payload, ['password']) : payload
        );
        if (!response.ok) return dispatch(updateEmployeeFailure());
        return dispatch(updateEmployeeSuccess(_.omit(payload, ['password'])));
    } catch {
        return dispatch(updateEmployeeFailure());
    }
};
