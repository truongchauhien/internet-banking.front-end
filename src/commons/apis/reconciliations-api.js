import request from "./commons/api-request";

/**
 * 
 * @param {undefined} payload 
 */
export const fetchReconciliations = (payload) => request({
    method: 'GET',
    resource: '/api/reconciliations',
    useAccessToken: true
});

/**
 * 
 * @param {object} payload
 * @param {Date} payload.fromTime
 * @param {Date} payload.toTime
 * @param {?number} payload.bankId
 */
export const createReconciliation = (payload) => request({
    method: 'POST',
    resource: '/api/reconciliations',
    body: payload,
    useAccessToken: true
});

/**
 * 
 * @param {object} payload
 * @param {number} payload.id
 */
export const deleteReconciliation = (payload) => request({
    method: 'DELETE',
    resource: `/api/reconciliations/${payload.id}`,
    useAccessToken: true
});
