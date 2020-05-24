import { createCustomerRequest, createCustomerFailure, createCustomerSuccess } from "./actions";
import { createCustomer } from "../../../commons/apis/customers-api";

/**
 * 
 * @param {object} payload
 * @param {object} payload.userName
 * @param {object} payload.password
 * @param {object} payload.fullName
 * @param {object} payload.email
 * @param {object} payload.phone
 */
export const thunkedCreateCustomer = (payload) => async (dispatch, getState) => {
    dispatch(createCustomerRequest());
    try {
        const response = await createCustomer(payload);
        if (!response.ok) return dispatch(createCustomerFailure());
        return dispatch(createCustomerSuccess(response.body));
    } catch {
        return dispatch(createCustomerFailure());
    }
};
