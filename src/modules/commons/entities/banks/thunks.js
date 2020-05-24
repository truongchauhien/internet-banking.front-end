import {
    fetchBanksRequest, fetchBanksFailure, FetchBanksSuccess
} from './actions';
import { fetchBanks } from "../../../../commons/apis/banks-api";

export const thunkedFetchBanks = () => {
    return async (dispatch, getState) => {
        dispatch(fetchBanksRequest());
        try {
            const response = await fetchBanks();
            if (!response.ok) return dispatch(fetchBanksFailure());
            return dispatch(FetchBanksSuccess(response.body.banks));
        } catch {
            return dispatch(fetchBanksFailure());
        }
    };
};
