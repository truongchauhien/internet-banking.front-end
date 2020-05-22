import {
    closeAccountRequest, closeAccountFailure, closeAccountSuccess,
    closureRequestModalOpenStatusChange
} from "./actions";
import { closeAccount } from "../../../../commons/apis/accounts-api";
import { thunkedFetchAccounts } from "../thunks";
import { thunkedFetchCustomer } from '../../thunks';

/**
 * 
 * @param {object} payload
 * @param {object} payload.closedAccountId
 * @param {object} payload.transferredAccountId
 */
export const thunkedCloseAccount = (payload) => async (dispatch, getState) => {
    dispatch(closeAccountRequest());
    try {
        const response = await closeAccount(payload);
        if (!response.ok) return dispatch(closeAccountFailure());
        dispatch(closureRequestModalOpenStatusChange(false));

        const state = getState();
        const customerId = state.authentication.userData.userId;
        await dispatch(thunkedFetchAccounts({
            customerId
        }));
        if (state.customer.accounts.defaultCurrentAccountId === payload.closedAccountId) {
            await dispatch(thunkedFetchCustomer({
                customerId
            }));
        }

        return dispatch(closeAccountSuccess());
    } catch {
        return dispatch(closeAccountFailure());
    }
};
