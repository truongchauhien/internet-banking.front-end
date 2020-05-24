import { createCustomerAccountRequest, createCustomerAccountFailure, createCustomerAccountSuccess } from './actions';
import { createAccount } from '../../../../commons/apis/accounts-api';

/**
 * 
 * @param {object} payload
 * @param {object} payload.customerId
 * @param {'current'|'deposit'} payload.type
 */
export const thunkedCreateCustomerAccount = (payload) => async (dispatch, getState) => {
    dispatch(createCustomerAccountRequest());
    try {
        const response = await createAccount(payload);
        if (!response.ok) return dispatch(createCustomerAccountFailure());
        return dispatch(createCustomerAccountSuccess(response.body));
    } catch {
        return dispatch(createCustomerAccountFailure());
    }
};
