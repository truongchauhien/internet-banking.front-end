export const DELETE_EMPLOYEE_REQUEST = 'DELETE_EMPLOYEE_REQUEST';
export const DELETE_EMPLOYEE_FAILURE = 'DELETE_EMPLOYEE_FAILURE';
export const DELETE_EMPLOYEE_SUCCESS = 'DELETE_EMPLOYEE_SUCCESS';

export const deleteEmployeeRequest = (payload) => ({
    type: DELETE_EMPLOYEE_REQUEST,
    payload
});

export const deleteEmployeeFailure = (payload) => ({
    type: DELETE_EMPLOYEE_FAILURE,
    payload
});

export const deleteEmployeeSuccess = (payload) => ({
    type: DELETE_EMPLOYEE_SUCCESS,
    payload
});
