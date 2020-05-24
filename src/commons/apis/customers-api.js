import request from "./commons/api-request";

/**
 * 
 * @param {object} payload
 * @param {number} payload.id
 * @param {string} payload.oldPassword
 * @param {string} payload.newPassword
 */
export const updateCustomerPassword = ({ customerId, ...body }) => request({
    resource: `/api/customers/${customerId}/password`,
    method: 'PUT',
    body: body,
    useAccessToken: true
});

/**
 * 
 * @param {object} payload
 * @param {number} payload.identity
 * @param {'id'|'userName'} payload.identityType
 */
export const fetchCustomer = (payload) => request({
    resource: `/api/customers/${payload.identity}`,
    method: 'GET',
    params: {
        identityType: payload.identityType
    },
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

/**
 * 
 * @param {object} payload
 * @param {number} payload.customerId
 * @param {object} payload.currentAccountId
 */
export const setDefaultCurrentAccount = (payload) => request({
    resource: `/api/customers/${payload.customerId}/defaultCurrentAccount`,
    method: 'PUT',
    body: payload,
    useAccessToken: true
});
