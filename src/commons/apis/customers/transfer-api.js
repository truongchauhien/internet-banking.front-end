import request from "../commons/api-request";

/**
 * 
 * @param {object} payload
 * @param {string} payload.fromAccountNumber
 * @param {string} payload.toAccountNumber
 * @param {number} payload.amount
 * @param {string} payload.message
 * @param {string} payload.whoPayFee
 */
export const createIntrabankTransfer = (payload) => request({
    method: 'POST',
    resource: '/customer-routes/transfer/intrabank',
    body: payload,
    useAccessToken: true
});

export const confirmIntrabankTransfer = ({ transferId, ...payload }) => request({
    method: 'PATCH',
    resource: `/customer-routes/transfer/intrabank/${transferId}`,
    body: payload,
    useAccessToken: true
});
