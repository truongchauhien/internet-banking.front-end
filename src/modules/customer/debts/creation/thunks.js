import { createDebtRequest, createDebtFailure, createDebtSuccess } from "./actions";
import { createDebt } from "../../../../commons/apis/debt-api";

/**
 * 
 * @param {object} payload
 * @param {string} payload.toCustomerHasAccountNumber
 * @param {number} payload.amount
 * @param {string} payload.message
 */
export const thunkedCreateDebt = (payload) => {
    return async (dispatch, getState) => {
        dispatch(createDebtRequest());
        try {
            const response = await createDebt(payload);
            if (!response.ok) return dispatch(createDebtFailure());
            return dispatch(createDebtSuccess(response.body.debt));
        } catch {
            return dispatch(createDebtFailure());
        }
    };
};
