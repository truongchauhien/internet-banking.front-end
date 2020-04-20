import request from "./commons/api-request";

export const fetchAccounts = () => request({
    method: 'GET',
    resource: `/api/accounts`,
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
