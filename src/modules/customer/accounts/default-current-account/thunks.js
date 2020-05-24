import { setDefaultCurrentAccountRequest, setDefaultCurrentAccountFailure, setDefaultCurrentAccountSuccess } from "./actions";
import { setDefaultCurrentAccount } from '../../../../commons/apis/customers-api';

/**
 * 
 * @param {object} payload
 * @param {number} payload.customerId
 * @param {number} payload.currentAccountId
 */
export const thunkedSetDefaultCurrentAccount = (payload) => async (dispatch, getState) => {
    dispatch(setDefaultCurrentAccountRequest());
    try {
        const response = await setDefaultCurrentAccount(payload);
        if (!response.ok) return dispatch(setDefaultCurrentAccountFailure());
        return dispatch(setDefaultCurrentAccountSuccess({
            defaultCurrentAccountId: payload.currentAccountId
        }));
    } catch (err) {
        console.log(err);
        return dispatch(setDefaultCurrentAccountFailure());
    }
};
