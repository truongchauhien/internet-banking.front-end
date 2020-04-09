export const FECTH_ACCOUNTS_REQUEST = 'FECTH_ACCOUNTS_REQUEST';
export const FETCH_ACCOUNTS_SUCCESS = 'FETCH_ACCOUNTS_SUCCESS';
export const FETCH_ACCOUNTS_FAILURE = 'FETCH_ACCOUNTS_FAILURE';

export const fetchAccountsRequest = () => {
    return {
        type: FECTH_ACCOUNTS_REQUEST
    };
};

export const fetchAccountsSuccess = (payload) => {
    return {
        type: FETCH_ACCOUNTS_SUCCESS,
        payload
    };
};

export const fetchAccountsFailure = () => {
    return {
        type: FETCH_ACCOUNTS_FAILURE
    };
};
