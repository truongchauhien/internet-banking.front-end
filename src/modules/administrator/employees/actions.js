export const FETCH_EMPLOYEES_REQUEST = 'FETCH_EMPLOYEES_REQUEST';
export const FETCH_EMPLOYEES_FAILURE = 'FETCH_EMPLOYEES_FAILURE';
export const FETCH_EMPLOYEES_SUCCESS = 'FETCH_EMPLOYEES_SUCCESS';

export const fetchEmployeesRequest = (payload) => ({
    type: FETCH_EMPLOYEES_REQUEST,
    payload
});

export const fetchEmployeesFailure = (payload) => ({
    type: FETCH_EMPLOYEES_FAILURE,
    payload
});

export const fetchEmployeesSuccess = (payload) => ({
    type: FETCH_EMPLOYEES_SUCCESS,
    payload
});
