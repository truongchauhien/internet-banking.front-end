import request from './commons/api-request';

export const fetchContacts = () => request({
    method: 'GET',
    resource: '/api/contacts',
    useAccessToken: true
});

export const deleteContact = ({ id }) => request({
    method: 'DELETE',
    resource: `/api/contacts/${id}`,
    useAccessToken: true
});

export const patchContact = ({contactId, ...payload}) => request({
    method: 'PATCH',
    resource: `/api/contacts/${contactId}`,
    body: payload,
    useAccessToken: true
});

export const createContact = ({...payload}) => request({
    method: 'POST',
    resource: `/api/contacts`,
    body: payload,
    useAccessToken: true
});
