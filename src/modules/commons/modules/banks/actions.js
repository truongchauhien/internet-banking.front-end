export const FETCH_BANKS_REQUEST = 'FETCH_BANKS_REQUEST';
export const FETCH_BANKS_FAILURE = 'FETCH_BANKS_FAILURE';
export const FETCH_BANKS_SUCCESS = 'FETCH_BANKS_SUCCESS';

export const fetchBanksRequest = (payload) => ({
    type: FETCH_BANKS_REQUEST,
    payload
});

export const fetchBanksFailure = (payload) => ({
    type: FETCH_BANKS_FAILURE,
    payload
});

export const FetchBanksSuccess = (payload) => ({
    type: FETCH_BANKS_SUCCESS,
    payload
});
