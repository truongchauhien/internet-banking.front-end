import request from "./commons/api-request";

/**
 * 
 * @param {object} payload
 * @param {?string} payload.userName
 * @param {?string} payload.accountNumber
 * @param {number} payload.amount
 */
export const createDeposit = (payload) => request({
    method: 'POST',
    resource: '/api/deposits',
    body: payload,
    useAccessToken: true
});
