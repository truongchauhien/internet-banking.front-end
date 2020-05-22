import { combineReducers } from "redux";
import {
    ACCOUNT_CLOSURE_REQUEST_INITIALIZE,
    CLOSURE_REQUEST_MODAL_OPEN_STATUS_CHANGE,
    CLOSURE_REQUEST_MODAL_INPUT_CHANGE,
    CLOSE_ACCOUNT_REQUEST,
    CLOSE_ACCOUNT_FAILURE,
    CLOSE_ACCOUNT_SUCCESS
} from "./actions";

const initState = {
    isModalOpen: false,
    isFetching: false,
    closedAccountId: null,
    inputs: {
        transferredAccountId: null
    }
};

const isModalOpenReducer = (state = initState.isModalOpen, action) => {
    switch (action.type) {
        case CLOSURE_REQUEST_MODAL_OPEN_STATUS_CHANGE:
            return action.payload;
        default:
            return state;
    }
};

const isFetchingReducer = (state = initState.isFetching, action) => {
    switch (action.type) {
        case CLOSE_ACCOUNT_REQUEST:
            return true;
        case CLOSE_ACCOUNT_FAILURE:
        case CLOSE_ACCOUNT_SUCCESS:
            return false;
        default:
            return state;
    }
};

const closedAccountIdReducer = (state = initState.closedAccountId, action) => {
    switch (action.type) {
        case ACCOUNT_CLOSURE_REQUEST_INITIALIZE:
            return action.payload.closedAccountId;
        default:
            return state;
    }
};

const inputFields = ['transferredAccountId'];
const inputsReducer = (state = initState.inputs, action) => {
    switch (action.type) {
        case CLOSURE_REQUEST_MODAL_INPUT_CHANGE:
            if (!inputFields.includes(action.payload.name)) return state;
            return Object.assign({}, state, { [action.payload.name]: action.payload.value });
        default:
            return state;
    }
};

export const closureRequestReducer = combineReducers({
    isModalOpen: isModalOpenReducer,
    isFetching: isFetchingReducer,
    closedAccountId: closedAccountIdReducer,
    inputs: inputsReducer
});

export default closureRequestReducer;
