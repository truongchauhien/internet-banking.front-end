import {
    fetchAccountsRequest,
    fetchAccountsSuccess,
    fetchAccountsFailure
} from './actions';
import { fetchAccounts } from '../../../commons/apis/accounts-api';

/**
 * 
 * @param {object} payload
 * @param {number} payload.customerId
 */
export const thunkedFetchAccounts = (payload) => {
    return async (dispatch, getState) => {        
        dispatch(fetchAccountsRequest());
        try {
            const response = await fetchAccounts(payload);
            if (!response.ok) {
                return dispatch(fetchAccountsFailure());
            }

            return dispatch(fetchAccountsSuccess(response.body.accounts));
        } catch (error) {
            return dispatch(fetchAccountsFailure());
        }
    };
};
