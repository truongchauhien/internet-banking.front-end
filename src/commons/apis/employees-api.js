import request from "./commons/api-request";

export const fetchEmployees = (payload) => request({
    method: 'GET',
    resource: '/api/employees',
    useAccessToken: true
});

/**
 * 
 * @param {object} payload
 * @param {string} payload.userName
 * @param {string} payload.password
 * @param {string} payload.fullName
 * @param {string} payload.email
 */
export const createEmployee = (payload) => request({
    method: 'POST',
    resource: '/api/employees',
    body: payload,
    useAccessToken: true
});

/**
 * 
 * @param {object} payload
 * @param {number} payload.id
 * @param {?string} payload.userName
 * @param {?string} payload.password
 * @param {?string} payload.fullName
 * @param {?string} payload.email
 */
export const updateEmployee = ({id, ...restFields}) => request({
    method: 'PATCH',
    resource: `/api/employees/${id}`,
    body: restFields,
    useAccessToken: true
});

/**
 * 
 * @param {object} payload
 * @param {number} payload.id
 */
export const deleteEmployee = ({id}) => request({
    method: 'DELETE',
    resource: `/api/employees/${id}`,
    useAccessToken: true
});
