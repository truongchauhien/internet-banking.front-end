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
