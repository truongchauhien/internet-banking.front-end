export const CREATE_INTERBANK_TRANSFER_REQUEST = 'CREATE_INTERBANK_TRANSFER_REQUEST';
export const CREATE_INTERBANK_TRANSFER_FAILURE = 'CREATE_INTERBANK_TRANSFER_FAILURE';
export const CREATE_INTERBANK_TRANSFER_SUCCESS = 'CREATE_INTERBANK_TRANSFER_SUCCESS';

export const createInterbankTransferRequest = (payload) => ({
    type: CREATE_INTERBANK_TRANSFER_REQUEST,
    payload
});

export const createInterbankTransferFailure = payload => ({
    type: CREATE_INTERBANK_TRANSFER_FAILURE,
    payload
});

export const createInterbankTransferSuccess = payload => ({
    type: CREATE_INTERBANK_TRANSFER_SUCCESS,
    payload
});

export const CONFIRM_INTERBANK_TRANSFER_REQUEST = 'CONFIRM_INTERBANK_TRANSFER_REQUEST';
export const CONFIRM_INTERBANK_TRANSFER_FAILURE = 'CONFIRM_INTERBANK_TRANSFER_FAILURE';
export const CONFIRM_INTERBANK_TRANSFER_SUCCESS = 'CONFIRM_INTERBANK_TRANSFER_SUCCESS';

export const confirmInterbankTransferRequest = payload => ({
    type: CONFIRM_INTERBANK_TRANSFER_REQUEST,
    payload
});

export const confirmInterbankTransferFailure = payload => ({
    type: CONFIRM_INTERBANK_TRANSFER_FAILURE,
    payload
});

export const confirmInterbankTransferSuccess = payload => ({
    type: CONFIRM_INTERBANK_TRANSFER_SUCCESS,
    payload
});
