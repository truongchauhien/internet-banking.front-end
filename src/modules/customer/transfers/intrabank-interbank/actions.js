export const CLEAR_INTRABANK_INTERBANK_TRANSFER = 'CLEAR_INTRABANK_INTERBANK_TRANSFER';

/**
 * 
 * @param {object} payload
 * @param {boolean} payload.stage
 * @param {boolean} payload.isFetching
 * @param {boolean} payload.error
 * @param {boolean} payload.createdTransfer
 */
export const clearIntrabankInterbankTransfer = (payload) => ({
    type: CLEAR_INTRABANK_INTERBANK_TRANSFER,
    payload
});
