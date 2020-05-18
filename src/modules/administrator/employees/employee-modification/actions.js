export const EMPLOYEE_MODIFICATION_INIT = 'EMPLOYEE_MODIFICATION_INIT';
export const employeeModificationInit = (payload) => ({
    type: EMPLOYEE_MODIFICATION_INIT,
    payload
});

export const EMPLOYEE_MODIFICATION_MODAL_OPEN_STATUS_CHANGE = 'EMPLOYEE_MODIFICATION_MODAL_OPEN_STATUS_CHANGE';
export const employeeModificationModelOpenStatusChange = (payload) => ({
    type: EMPLOYEE_MODIFICATION_MODAL_OPEN_STATUS_CHANGE,
    payload
});

export const EMPLOYEE_MODIFICATION_MODAL_INPUT_CHANGE = 'EMPLOYEE_MODIFICATION_MODAL_INPUT_CHANGE';
export const employeeModificationModalInputChange = (payload) => ({
    type: EMPLOYEE_MODIFICATION_MODAL_INPUT_CHANGE,
    payload
});

export const UPDATE_EMPLOYEE_REQUEST = 'UPDATE_EMPLOYEE_REQUEST';
export const UPDATE_EMPLOYEE_FAILURE = 'UPDATE_EMPLOYEE_FAILURE';
export const UPDATE_EMPLOYEE_SUCCESS = 'UPDATE_EMPLOYEE_SUCCESS';

export const updateEmployeeRequest = (payload) => ({
    type: UPDATE_EMPLOYEE_REQUEST,
    payload
});

export const updateEmployeeFailure = (payload) => ({
    type: UPDATE_EMPLOYEE_FAILURE,
    payload
});

export const updateEmployeeSuccess = (payload) => ({
    type: UPDATE_EMPLOYEE_SUCCESS,
    payload
});
