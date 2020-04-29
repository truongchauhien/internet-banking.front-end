import {
    fetchAccountsRequest,
    fetchAccountsSuccess,
    fetchAccountsFailure
} from './account-actions';
import { fetchAccounts } from '../../../commons/apis/accounts-api';

/**
 * 
 * @param {object} payload
 * @param {number} payload.customerId
 */
export const thunkedFetchAccounts = (payload) => {
    return async (dispatch, getState) => {
        const accountAllIds = _.get(getState(), ['customer','accounts','allIds']);
        if (accountAllIds.length !== 0) {
            // Do not fetch again.
            return;
        }
        
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
