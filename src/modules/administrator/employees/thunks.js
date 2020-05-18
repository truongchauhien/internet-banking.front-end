import {
    fetchEmployeesRequest, fetchEmployeesFailure, fetchEmployeesSuccess
} from "./actions";
import { fetchEmployees } from '../../../commons/apis/employees-api';

export const thunkedFetchEmployees = (payload) => async (dispatch, getState) => {
    dispatch(fetchEmployeesRequest());
    try {
        const response = await fetchEmployees();
        if (!response.ok) return dispatch(fetchEmployeesFailure());
        return dispatch(fetchEmployeesSuccess(response.body));
    } catch {
        return dispatch(fetchEmployeesFailure());
    }
};
