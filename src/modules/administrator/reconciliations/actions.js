export const FETCH_RECONCILIATIONS_REQUEST = 'FETCH_RECONCILIATIONS_REQUEST';
export const FETCH_RECONCILIATIONS_FAILURE = 'FETCH_RECONCILIATIONS_FAILURE';
export const FETCH_RECONCILIATIONS_SUCCESS = 'FETCH_RECONCILIATIONS_SUCCESS';

export const fetchReconciliationsRequest = (payload) => ({
    type: FETCH_RECONCILIATIONS_REQUEST,
    payload
});

export const fetchReconciliationsFailure = (payload) => ({
    type: FETCH_RECONCILIATIONS_FAILURE,
    payload
});

export const fetchReconciliationsSuccess = (payload) => ({
    type: FETCH_RECONCILIATIONS_SUCCESS,
    payload
});

export const CREATE_RECONCILIATION_REQUEST = 'CREATE_RECONCILIATION_REQUEST';
export const CREATE_RECONCILIATION_FAILURE = 'CREATE_RECONCILIATION_FAILURE';
export const CREATE_RECONCILIATION_SUCCESS = 'CREATE_RECONCILIATION_SUCCESS';

export const createReconciliationRequest = (payload) => ({
    type: CREATE_RECONCILIATION_REQUEST,
    payload
});

export const createReconciliationFailure = (payload) => ({
    type: CREATE_RECONCILIATION_FAILURE,
    payload
});

export const createReconciliationSuccess = (payload) => ({
    type: CREATE_RECONCILIATION_SUCCESS,
    payload
});

export const DELETE_RECONCILIATION_REQUEST = 'DELETE_RECONCILIATION_REQUEST';
export const DELETE_RECONCILIATION_FAILURE = 'DELETE_RECONCILIATION_FAILURE';
export const DELETE_RECONCILIATION_SUCCESS = 'DELETE_RECONCILIATION_SUCCESS';

export const deleteReconciliationRequest = (payload) => ({
    type: DELETE_RECONCILIATION_REQUEST,
    payload
});

export const deleteReconciliationFailure = (payload) => ({
    type: DELETE_RECONCILIATION_FAILURE,
    payload
});

export const deleteReconciliationSuccess = (payload) => ({
    type: DELETE_RECONCILIATION_SUCCESS,
    payload
});
