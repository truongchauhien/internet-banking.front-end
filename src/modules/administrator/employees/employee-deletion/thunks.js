import { deleteEmployeeRequest, deleteEmployeeFailure, deleteEmployeeSuccess } from "./actions";
import { deleteEmployee } from "../../../../commons/apis/employees-api";

/**
 * 
 * @param {object} payload
 * @param {number} payload.id
 */
export const thunkedDeleteEmployee = (payload) => async (dispatch, getState) => {
    dispatch(deleteEmployeeRequest());
    try {
        const response = await deleteEmployee(payload);
        if (!response.ok) return dispatch(deleteEmployeeFailure());
        return dispatch(deleteEmployeeSuccess({ id: payload.id }));
    } catch {
        return dispatch(deleteEmployeeFailure());
    }
};
