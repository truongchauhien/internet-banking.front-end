import { thunkedFetchCustomer } from '../../commons/entities/customers/thunks';
import { thunkedFetchAccounts } from '../../commons/entities/accounts/thunks';

/**
 * 
 * @param {object} payload
 * @param {string} payload.customerUserName
 */
export const thunkedFetchCustomerAndAccounts = (payload) => async (dispatch, getState) => {
    await dispatch(thunkedFetchCustomer({
        identity: payload.customerUserName,
        identityType: 'userName'
    }));
    const customerId = getState().employee.customerAccounts.customerId;
    if (!customerId) return;
    await dispatch(thunkedFetchAccounts({
        customerId: customerId
    }));
};
