import request from '../commons/api-request';

export const fetchContacts = () => request({
    method: 'GET',
    resource: '/customer-routes/contacts',
    useAccessToken: true
});

export const deleteContact = ({ id }) => request({
    method: 'DELETE',
    resource: `/customer-routes/contacts/${id}`,
    useAccessToken: true
});

export const patchContact = ({contactId, ...payload}) => request({
    method: 'PATCH',
    resource: `/customer-routes/contacts/${contactId}`,
    body: payload,
    useAccessToken: true
});

export const createContact = ({...payload}) => request({
    method: 'POST',
    resource: `/customer-routes/contacts`,
    body: payload,
    useAccessToken: true
});
