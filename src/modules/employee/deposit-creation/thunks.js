import { depositCreationRequest, depositCreationFailure, depositCreationSuccess } from "./actions";
import { createDeposit } from '../../../commons/apis/deposits-api';
import { thunkedFetchCustomer } from "../../commons/entities/customers/thunks";
import { thunkedFetchAccount } from "../../commons/entities/accounts/thunks";
import { depositAdd } from "../../commons/entities/deposits/actions";

/**
 * 
 * @param {object} payload
 * @param {?string} payload.userName
 * @param {?string} payload.accountNumber
 * @param {number} payload.amount
 * @param {object} meta
 * @param {'truncate'|'append'} meta.mode
 */
export const thunkedCreateDeposit = (payload, meta) => async (dispatch, getState) => {
    dispatch(depositCreationRequest());
    try {
        const response = await createDeposit(payload);
        if (!response.ok) return dispatch(depositCreationFailure());
        dispatch(depositAdd(response.body, { mode: meta?.mode || 'truncate' }));
        return dispatch(depositCreationSuccess(response.body));
    } catch {
        dispatch(depositCreationFailure());
    }
};

/**
 * 
 * @param {object} payload
 * @param {object} payload.accountNumber
 */
export const thunkedFetchAccountThenCustomer = (payload) => async (dispatch, getState) => {
    await dispatch(thunkedFetchAccount({
        identity: payload.accountNumber,
        identityType: 'accountNumber',
    }, { mode: 'truncate' }));
    const customerId = getState().employee.depositCreation.customerId;
    await dispatch(thunkedFetchCustomer({
        identity: customerId,
        identityType: 'id'
    }, { mode: 'truncate' }));
};
