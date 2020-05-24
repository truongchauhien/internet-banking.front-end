export const DEPOSIT_ADD = 'DEPOSIT_ADD';

/**
 * 
 * @param {object} payload
 * @param {object} payload.deposit
 * @param {object} meta
 * @param {'append'|'truncate'|'overwrite'} meta.mode
 */
export const depositAdd = (payload, meta) => ({
    type: DEPOSIT_ADD,
    payload,
    meta
});
