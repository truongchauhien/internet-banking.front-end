import { createAccount } from '../../../../commons/apis/accounts-api';
import { createCustomerAccountRequest, createCustomerAccountFailure, createCustomerAccountSuccess } from './actions';
import { fetchAccountSuccess } from '../../../commons/entities/accounts/actions';

/**
 * 
 * @param {object} payload
 * @param {object} payload.customerId
 * @param {'current'|'deposit'} payload.type
 * @param {object} meta
 * @param {'truncate'|'append'} meta.mode
 */
export const thunkedCreateCustomerAccount = (payload, meta) => async (dispatch, getState) => {
    dispatch(createCustomerAccountRequest());
    try {
        const response = await createAccount(payload);
        if (!response.ok) return dispatch(createCustomerAccountFailure());
        dispatch(fetchAccountSuccess({
            account: response.body.account
        }, { mode: meta?.mode || 'append' }));
        return dispatch(createCustomerAccountSuccess(response.body));
    } catch {
        return dispatch(createCustomerAccountFailure());
    }
};
