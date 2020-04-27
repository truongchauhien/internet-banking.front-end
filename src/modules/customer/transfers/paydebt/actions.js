export const PAYDEBT_TRANSFER_CREATE_REQUEST = 'PAYDEBT_TRANSFER_CREATE_REQUEST';
export const PAYDEBT_TRANSFER_CREATE_FAILURE = 'PAYDEBT_TRANSFER_CREATE_FAILURE';
export const PAYDEBT_TRANSFER_CREATE_SUCCESS = 'PAYDEBT_TRANSFER_CREATE_SUCCESS';

export const payDebtTransferCreateRequest = payload => ({
    type: PAYDEBT_TRANSFER_CREATE_REQUEST,
    payload
});

export const payDebtTransferCreateFailure = payload => ({
    type: PAYDEBT_TRANSFER_CREATE_FAILURE,
    payload
});

export const payDebtTransferCreateSuccess = payload => ({
    type: PAYDEBT_TRANSFER_CREATE_SUCCESS,
    payload
});

export const PAYDEBT_TRANSFER_CONFIRM_REQUEST = 'PAYDEBT_TRANSFER_CONFIRM_REQUEST';
export const PAYDEBT_TRANSFER_CONFIRM_FAILURE = 'PAYDEBT_TRANSFER_CONFIRM_FAILURE';
export const PAYDEBT_TRANSFER_CONFIRM_SUCCESS = 'PAYDEBT_TRANSFER_CONFIRM_SUCCESS';

export const payDebtTransferConfirmRequest = payload => ({
    type: PAYDEBT_TRANSFER_CONFIRM_REQUEST,
    payload
});

export const payDebtTransferConfirmFailure = payload => ({
    type: PAYDEBT_TRANSFER_CONFIRM_FAILURE,
    payload
});

export const payDebtTransferConfirmSuccess = payload => ({
    type: PAYDEBT_TRANSFER_CONFIRM_SUCCESS,
    payload
});
