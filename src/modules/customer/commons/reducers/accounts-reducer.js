import {
    FECTH_ACCOUNTS_REQUEST,
    FETCH_ACCOUNTS_SUCCESS,
    FETCH_ACCOUNTS_FAILURE
} from '../actions/account-actions';

const initState = [];

export const accountsReducer = (state = initState, action) => {
    switch (action.type) {
        case FECTH_ACCOUNTS_REQUEST:
            return state;
        case FETCH_ACCOUNTS_SUCCESS:
            return action.payload;
        case FETCH_ACCOUNTS_FAILURE:
            return state;
        default:
            return state;
    }
};

export default accountsReducer;
