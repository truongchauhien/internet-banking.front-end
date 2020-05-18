import {
    fetchReconciliationsRequest, fetchReconciliationsFailure, fetchReconciliationsSuccess,
    deleteReconciliationRequest, deleteReconciliationFailure, deleteReconciliationSuccess,
    createReconciliationRequest, createReconciliationFailure, createReconciliationSuccess
} from "./actions";
import { fetchReconciliations, deleteReconciliation, createReconciliation } from "../../../commons/apis/reconciliations-api";

/**
 * 
 * @param {undefined} payload
 */
export const thunkedFetchReconciliations = (payload) => async (dispatch, getState) => {
    dispatch(fetchReconciliationsRequest());
    try {
        const response = await fetchReconciliations();
        if (!response.ok) return dispatch(fetchReconciliationsFailure());
        dispatch(fetchReconciliationsSuccess(response.body));
    } catch {
        dispatch(fetchReconciliationsFailure())
    }
};

/**
 * 
 * @param {object} payload
 * @param {number} payload.id
 */
export const thunkedDeleteReconciliation = (payload) => async (dispatch, getState) => {
    dispatch(deleteReconciliationRequest());
    try {
        const response = await deleteReconciliation(payload);
        if (!response.ok) return dispatch(deleteReconciliationFailure());
        return dispatch(deleteReconciliationSuccess(payload));
    } catch {
        return dispatch(deleteReconciliationFailure());
    }
};

/**
 * 
 * @param {object} payload
 * @param {Date} payload.fromTime
 * @param {Date} payload.toTime
 * @param {?number} payload.bankId
 */
export const thunkedCreateReconciliation = (payload) => async (dispatch, getState) => {
    dispatch(createReconciliationRequest());
    try {
        const response = await createReconciliation(payload);
        if (!response.ok) return dispatch(createReconciliationFailure());
        return dispatch(createReconciliationSuccess(response.body));
    } catch {
        return dispatch(createReconciliationFailure());
    }
};
