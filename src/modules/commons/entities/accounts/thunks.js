import _ from 'lodash';
import {
    fetchAccountsRequest,
    fetchAccountsSuccess,
    fetchAccountsFailure,
    fetchAccountRequest,
    fetchAccountFailure,
    fetchAccountSuccess
} from './actions';
import { fetchAccounts, fetchAccount } from '../../../../commons/apis/accounts-api';
import BANKS from '../../../../commons/constants/banks';

/**
 * 
 * @param {object} payload
 * @param {?number} payload.customerId
 * @param {?string} payload.customerUserName
 * @param {object} meta
 * @param {'truncate'|'append'} meta.mode
 */
export const thunkedFetchAccounts = (payload, meta) => async (dispatch, getState) => {
    dispatch(fetchAccountsRequest());
    try {
        const response = await fetchAccounts(payload);
        if (!response.ok) return dispatch(fetchAccountsFailure());
        return dispatch(fetchAccountsSuccess(response.body, {
            mode: (meta && meta.mode) || 'append'
        }));
    } catch (error) {
        console.log(error);
        return dispatch(fetchAccountsFailure());
    }
};

/**
 * 
 * @param {object} payload
 * @param {'id'|'accountNumber'} payload.identityType
 * @param {object} payload.identity
 * @param {object} meta
 * @param {'truncate'|'append'} meta.mode
 */
export const thunkedFetchAccount = (payload, meta) => async (dispatch, getState) => {
    dispatch(fetchAccountRequest());
    try {
        const response = await fetchAccount({
            identity: payload.identity,
            identityType: payload.identityType,
            bankId: BANKS.INTERNAL,
        });
        if (!response.ok) return dispatch(fetchAccountFailure());
        return dispatch(fetchAccountSuccess(response.body, {
            mode: (meta && meta.mode) || 'append'
        }));
    } catch (error) {
        console.log(error);
        return dispatch(fetchAccountFailure());
    }
};
