export const EMPLOYEE_CREATION_INIT = 'EMPLOYEE_CREATION_INIT';
export const employeeCreationInit = (payload) => ({
    type: EMPLOYEE_CREATION_INIT,
    payload
});

export const EMPLOYEE_CREATION_MODAL_OPEN_STATUS_CHANGE = 'EMPLOYEE_CREATION_MODAL_OPEN_STATUS_CHANGE';
export const employeeCreationModalOpenStatusChange = (payload) => ({
    type: EMPLOYEE_CREATION_MODAL_OPEN_STATUS_CHANGE,
    payload
});

export const EMPLOYEE_CREATION_MODAL_INPUT_CHANGE = 'EMPLOYEE_CREATION_MODAL_INPUT_CHANGE';
export const employeeCreationModalInputChange = (payload) => ({
    type: EMPLOYEE_CREATION_MODAL_INPUT_CHANGE,
    payload
});

export const CREATE_EMPLOYEE_REQUEST = 'CREATE_EMPLOYEE_REQUEST';
export const CREATE_EMPLOYEE_FAILURE = 'CREATE_EMPLOYEE_FAILURE';
export const CREATE_EMPLOYEE_SUCCESS = 'CREATE_EMPLOYEE_SUCCESS';

export const createEmployeeRequest = (payload) => ({
    type: CREATE_EMPLOYEE_REQUEST,
    payload
});

export const createEmployeeFailure = (payload) => ({
    type: CREATE_EMPLOYEE_FAILURE,
    payload
});

export const createEmployeeSuccess = (payload) => ({
    type: CREATE_EMPLOYEE_SUCCESS,
    payload
});
