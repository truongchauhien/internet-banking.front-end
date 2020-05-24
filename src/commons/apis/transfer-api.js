import request from "./commons/api-request";

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
    resource: '/api/transfers',
    body: {
        type: 'intrabank',
        ...payload
    },
    useAccessToken: true
});

/**
 * 
 * @param {object} payload
 * @param {number} payload.transferId
 * @param {string} payload.otp
 */
export const confirmIntrabankTransfer = ({ transferId, ...payload }) => request({
    method: 'POST',
    resource: `/api/transfers/${transferId}`,
    body: {
        type: 'intrabank',
        ...payload
    },
    useAccessToken: true
});

/**
 * 
 * @param {object} payload
 * @param {string} payload.fromAccountNumber
 * @param {string} payload.toAccountNumber
 * @param {number} payload.toBankId
 * @param {number} payload.amount
 * @param {string} payload.message
 * @param {string} payload.whoPayFee
 */
export const createInterbankTransfer = (payload) => request({
    method: 'POST',
    resource: '/api/transfers',
    body: {
        type: 'interbank',
        ...payload
    },
    useAccessToken: true
});

/**
 * 
 * @param {object} payload
 * @param {number} payload.transferId
 * @param {string} payload.otp
 */
export const confirmInterbankTransfer = ({ transferId, ...payload }) => request({
    method: 'POST',
    resource: `/api/transfers/${transferId}`,
    body: {
        type: 'interbank',
        ...payload
    },
    useAccessToken: true
});

/**
 * 
 * @param {object} payload
 * @param {object} payload.debtId
 */
export const createPayDebtTransfer = (payload) => request({
    method: 'POST',
    resource: '/api/transfers',
    body: {
        type: 'paydebt',
        ...payload
    },
    useAccessToken: true
});

/**
 * 
 * @param {object} payload
 * @param {number} payload.transferId
 * @param {string} payload.otp
 */
export const confirmPayDebtTransfer = ({ transferId, ...payload }) => request({
    method: 'POST',
    resource: `/api/transfers/${transferId}`,
    body: {
        type: 'paydebt',
        ...payload
    },
    useAccessToken: true
});
