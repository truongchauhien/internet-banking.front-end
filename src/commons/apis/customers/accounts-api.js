import request from "../commons/api-request";

export const fetchAccounts = () => request({
    method: 'GET',
    resource: `/customer-routes/accounts`,
    useAccessToken: true
});

export const fetchAccountByAccountNumber = ({ accountNumber }) => request({
    method: 'GET',
    resource: `/customer-routes/accounts/${accountNumber}`,
    useAccessToken: true
});

export const fetchTransactionsByAccountNumber = ({accountNumber}) => request({
    method: 'GET',
    resource: `/customer-routes/accounts/${accountNumber}/transactions`,
    useAccessToken: true
});
