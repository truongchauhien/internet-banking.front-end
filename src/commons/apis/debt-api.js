import request from "./commons/api-request";

/**
 * 
 * @param {object} payload
 * @param {'sent'|'received'|'both'} payload.type
 * @param {Date} payload.fromTime
 * @param {Date} payload.toTime
 * @param {boolean} payload.newOnly,
 * @param {number} payload.pageNumber
 */
export const getDebts = (payload) => request({
    method: 'GET',
    resource: '/api/debts',
    params: payload,
    useAccessToken: true
});

export const createDebt = (payload) => request({
    method: 'POST',
    resource: '/api/debts',
    body: payload,
    useAccessToken: true
});

export const cancelDebt = ({ debtId, ...payload }) => request({
    method: 'DELETE',
    resource: `/api/debts/${debtId}`,
    body: payload,
    useAccessToken: true
});
