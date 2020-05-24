import { queryAccountRequest, queryAccountFailure, queryAccountSuccess } from "./actions";
import { fetchAccount } from '../../../../commons/apis/accounts-api';

/**
 * 
 * @param {object} payload
 * @param {string} payload.accountNumber
 * @param {number} payload.bankId
 */
export const thunkedQueryAccount = (payload) => async (dispatch, getState) => {
    dispatch(queryAccountRequest(payload));
    try {
        const response = await fetchAccount({
            identityType: 'accountNumber',
            identity: payload.accountNumber,
            bankId: payload.bankId
        });
        if (!response.ok) return dispatch(queryAccountFailure());
        return dispatch(queryAccountSuccess(response.body));
    } catch {
        return dispatch(queryAccountFailure());
    }
};
