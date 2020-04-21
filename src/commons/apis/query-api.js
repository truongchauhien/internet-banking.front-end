import request from "./commons/api-request";

export const fetchLinkedBanks = () => request({
    method: 'GET',
    resource: '/api/queries/linked-banks',
    useAccessToken: true
});
