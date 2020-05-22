import request from "./commons/api-request";

/**
 * 
 * @param {object} payload
 * @param {number} payload.customerId
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
 * @param {number|string} payload.identityValue
 * @param {'id'|'accountNumber'} payload.identityType
 */
export const fetchAccount = ({ identityValue, identityType }) => request({
    method: 'GET',
    resource: `/api/accounts/${identityValue}`,
    params: {
        identityType
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
