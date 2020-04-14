export const CREATE_INTRABANK_TRANSFER_REQUEST = 'CREATE_INTRABANK_TRANSFER_REQUEST';
export const CREATE_INTRABANK_TRANSFER_FAILURE = 'CREATE_INTRABANK_TRANSFER_FAILURE';
export const CREATE_INTRABANK_TRANSFER_SUCCESS = 'CREATE_INTRABANK_TRANSFER_SUCCESS';

export const createIntrabankTransferRequest = (payload) => ({
    type: CREATE_INTRABANK_TRANSFER_REQUEST,
    payload
});

export const createIntrabankTransferFailure = payload => ({
    type: CREATE_INTRABANK_TRANSFER_FAILURE,
    payload
});

export const createIntrabankTransferSuccess = payload => ({
    type: CREATE_INTRABANK_TRANSFER_SUCCESS,
    payload
});

export const CONFIRM_INTRABANK_TRANSFER_REQUEST = 'CONFIRM_INTRABANK_TRANSFER_REQUEST';
export const CONFIRM_INTRABANK_TRANSFER_FAILURE = 'CONFIRM_INTRABANK_TRANSFER_FAILURE';
export const CONFIRM_INTRABANK_TRANSFER_SUCCESS = 'CONFIRM_INTRABANK_TRANSFER_SUCCESS';

export const confirmIntrabankTransferRequest = payload => ({
    type: CONFIRM_INTRABANK_TRANSFER_REQUEST,
    payload
});

export const confirmIntrabankTransferFailure = payload => ({
    type: CONFIRM_INTRABANK_TRANSFER_FAILURE,
    payload
});

export const confirmIntrabankTransferSuccess = payload => ({
    type: CONFIRM_INTRABANK_TRANSFER_SUCCESS,
    payload
});

export const CLEAR_INTRABANK_TRANSFER = 'CLEAR_INTRABANK_TRANSFER';

export const clearIntrabankTransfer = payload => ({
    type: CLEAR_INTRABANK_TRANSFER,
    payload
});
