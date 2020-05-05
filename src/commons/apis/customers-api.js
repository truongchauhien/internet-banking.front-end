import request from "./commons/api-request";

/**
 * 
 * @param {object} payload
 * @param {number} payload.id
 * @param {string} payload.oldPassword
 * @param {string} payload.newPassword
 */
export const createCustomerPasswordChange = ({ customerId, ...body }) => request({
    resource: `/api/customers/${customerId}/password`,
    method: 'POST',
    body: body,
    useAccessToken: true
});

/**
 * 
 * @param {object} payload
 * @param {object} payload.userName
 * @param {object} payload.password
 * @param {object} payload.fullName
 * @param {object} payload.email
 * @param {object} payload.phone
 */
export const createCustomer = (payload) => request({
    resource: '/api/customers',
    method: 'POST',
    body: payload,
    useAccessToken: true
});
