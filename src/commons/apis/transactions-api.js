import request from "./commons/api-request";

/**
 * 
 * @param {object} payload
 * @param {?number} payload.accountId
 * @param {?string} payload.userName
 * @param {number} payload.startingAfter
 */
export const fetchTransactions = (payload) => request({
    method: 'GET',
    resource: '/api/transactions',
    params: payload,
    useAccessToken: true
});
