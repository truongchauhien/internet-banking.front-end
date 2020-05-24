import { fetchCustomerRequest, fetchCustomerFailure, fetchCustomerSuccess } from "./actions";
import { fetchCustomer } from "../../../../commons/apis/customers-api";

/**
 * 
 * @param {object} payload
 * @param {number|string} payload.identity
 * @param {'id'|'userName'} payload.identityType
 * @param {object} meta
 * @param {'append'|'truncate'} meta.mode
 */
export const thunkedFetchCustomer = (payload, meta) => async (dispatch, getState) => {
    dispatch(fetchCustomerRequest());
    try {
        const response = await fetchCustomer(payload);
        if (!response.ok) return dispatch(fetchCustomerFailure());
        return dispatch(fetchCustomerSuccess(response.body, {
            mode: meta?.mode || 'append',
        }));
    } catch (error) {
        console.log(error);
        return dispatch(fetchCustomerFailure());
    }
};
