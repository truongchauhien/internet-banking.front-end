import { createCustomerRequest, createCustomerFailure, createCustomerSuccess } from './actions';
import { createCustomer } from '../../../commons/apis/customers-api';
import { fetchCustomerSuccess } from '../../commons/entities/customers/actions';
import { fetchAccountSuccess } from '../../commons/entities/accounts/actions';

/**
 * 
 * @param {object} payload
 * @param {string} payload.userName
 * @param {string} payload.password
 * @param {string} payload.fullName
 * @param {string} payload.email
 * @param {string} payload.phone
 * @param {object} meta
 * @param {'truncate'|'append'} meta.mode
 */
export const thunkedCreateCustomer = (payload, meta) => async (dispatch, getState) => {
    dispatch(createCustomerRequest());
    try {
        const response = await createCustomer(payload);
        if (!response.ok) return dispatch(createCustomerFailure());
        dispatch(fetchAccountSuccess({
            account: response.body.account
        }, { mode: (meta && meta.mode) || 'append' }));
        dispatch(fetchCustomerSuccess({
            customer: response.body.customer
        }, { mode: (meta && meta.mode) || 'append' }));
        return dispatch(createCustomerSuccess(response.body));
    } catch (error) {
        console.error(error);
        return dispatch(createCustomerFailure());
    }
};
