import {
    fetchAccountsRequest,
    fetchAccountsSuccess,
    fetchAccountsFailure
} from './account-actions';
import { fetchAccounts } from '../../../commons/apis/customers/accounts-api';

export const thunkedFetchAccounts = () => {
    return async (dispatch, getState) => {
        dispatch(fetchAccountsRequest());

        try {
            const response = await fetchAccounts();
            if (!response.ok) {
                return dispatch(fetchAccountsFailure());
            }

            return dispatch(fetchAccountsSuccess(response.body.accounts));
        } catch (error) {
            return dispatch(fetchAccountsFailure());
        }
    };
};
