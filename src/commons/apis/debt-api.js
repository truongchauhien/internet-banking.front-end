import request from "./commons/api-request";

/**
 * 
 * @param {object} payload
 * @param {'sent'|'received'|'both'} payload.type
 * @param {number} payload.startingAfter
 * @param {boolean} payload.newOnly
 */
export const getDebts = (payload) => request({
    method: 'GET',
    resource: '/api/debts',
    params: payload,
    useAccessToken: true
});

/**
 * 
 * @param {object} payload
 * @param {'id'|'transferId'} payload.identityType
 * @param {string|number} payload.identityValue
 */
export const getDebt = (payload) => request({
    method: 'GET',
    resource: `/api/debts/${payload.identityValue}`,
    params: {
        identityType: payload.identityType
    },
    useAccessToken: true
});

/**
 * 
 * @param {object} payload
 * @param {string} payload.toAccountNumber
 * @param {number} payload.amount
 * @param {string} payload.message
 */
export const createDebt = (payload) => request({
    method: 'POST',
    resource: '/api/debts',
    body: payload,
    useAccessToken: true
});

/**
 * 
 * @param {object} payload
 * @param {number} payload.id
 * @param {string} payload.canceledReason
 */
export const cancelDebt = ({ id, ...payload }) => request({
    method: 'DELETE',
    resource: `/api/debts/${id}`,
    body: payload,
    useAccessToken: true
});
