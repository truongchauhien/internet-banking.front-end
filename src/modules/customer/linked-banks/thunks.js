import {
    linkedBanksFetchRequest, linkedBanksFetchFailure, linkedBanksFetchSuccess
} from './actions';
import { fetchLinkedBanks } from "../../../commons/apis/query-api";

export const thunkedFetchLinkedBanks = () => {
    return async (dispatch, getState) => {
        dispatch(linkedBanksFetchRequest);
        try {
            const response = await fetchLinkedBanks();
            if (!response.ok) return dispatch(linkedBanksFetchFailure());
            return dispatch(linkedBanksFetchSuccess(response.body.linkedBanks));
        } catch {
            return dispatch(linkedBanksFetchFailure());
        }
    };
};
