import { fetchCustomerRequest, fetchCustomerFailure, fetchCustomerSuccess } from "./actions";
import { fetchCustomer } from "../../../../commons/apis/customers-api";

/**
 * 
 * @param {object} payload
 * @param {number|string} payload.identity
 * @param {'id'|'userName'} payload.identityType
 */
export const thunkedFetchCustomer = (payload) => async (dispatch,getState) => {
    dispatch(fetchCustomerRequest());
    try {
        const response = await fetchCustomer(payload);
        if (!response.ok) return dispatch(fetchCustomerFailure());
        return dispatch(fetchCustomerSuccess(response.body));
    } catch (err) {
        console.log(err);
        return dispatch(fetchCustomerFailure());
    }
};
