import { createEmployeeRequest, createEmployeeFailure, createEmployeeSuccess } from "./actions";
import { createEmployee } from "../../../../commons/apis/employees-api";

export const thunkedCreateEmployee = (payload) => async (dispatch, getState) => {
    dispatch(createEmployeeRequest());
    try {
        const response = await createEmployee(payload);
        if (!response.ok) return dispatch(createEmployeeFailure());
        return dispatch(createEmployeeSuccess(response.body));
    } catch {
        return dispatch(createEmployeeFailure());
    }
};
