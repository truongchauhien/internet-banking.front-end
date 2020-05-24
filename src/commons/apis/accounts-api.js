import request from "./commons/api-request";

/**
 * 
 * @param {object} payload
 * @param {?number} payload.customerId
 * @param {?string} payload.customerUserName this parameter is only used for employee only.
 */
export const fetchAccounts = (payload) => request({
    method: 'GET',
    resource: `/api/accounts`,
    params: payload,
    useAccessToken: true
});

/**
 * 
 * @param {object} payload
 * @param {number|string} payload.identity
 * @param {'id'|'accountNumber'} payload.identityType
 * @param {?number} payload.bankId
 */
export const fetchAccount = (payload) => request({
    method: 'GET',
    resource: `/api/accounts/${payload.identity}`,
    params: {
        identityType: payload.identityType,
        bankId: payload.bankId 
    },
    useAccessToken: true
});

/**
 * 
 * @param {object} payload
 * @param {object} payload.closedAccountId
 * @param {object} payload.transferredAccountId
 */
export const closeAccount = (payload) => request({
    method: 'DELETE',
    resource: `/api/accounts/${payload.closedAccountId}`,
    body: payload,
    useAccessToken: true
});

/**
 * 
 * @param {object} payload
 * @param {number} payload.customerId
 * @param {'current'|'deposit'} payload.type
 */
export const createAccount = (payload) => request({
    resource: '/api/accounts',
    method: 'POST',
    body: payload,
    useAccessToken: true
});
