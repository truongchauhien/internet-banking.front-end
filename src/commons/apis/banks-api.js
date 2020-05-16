import request from "./commons/api-request";

export const fetchBanks = (payload) => request({
    method: 'GET',
    resource: '/api/banks',
    useAccessToken: true
});
