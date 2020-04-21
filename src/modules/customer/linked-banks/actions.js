export const LINKED_BANKS_FETCH_REQUEST = 'LINKED_BANKS_FETCH_REQUEST';
export const LINKED_BANKS_FETCH_FAILURE = 'LINKED_BANKS_FETCH_FAILURE';
export const LINKED_BANKS_FETCH_SUCCESS = 'LINKED_BANKS_FETCH_SUCCESS';

export const linkedBanksFetchRequest = (payload) => ({
    type: LINKED_BANKS_FETCH_REQUEST,
    payload
});

export const linkedBanksFetchFailure = (payload) => ({
    type: LINKED_BANKS_FETCH_FAILURE,
    payload
});

export const linkedBanksFetchSuccess = (payload) => ({
    type: LINKED_BANKS_FETCH_SUCCESS,
    payload
});
