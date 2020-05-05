import { DEPOSIT_CREATION_REQUEST, DEPOSIT_CREATION_FAILURE, DEPOSIT_CREATION_SUCCESS, DEPOSIT_CREATION_RESET } from "./actions";
import { combineReducers } from "redux";

const initState = {
    isCreating: false,
    hasError: false,
    response: null
};

const isCreatingReducer = (state = initState.isCreating, action) => {
    switch (action.type) {
        case DEPOSIT_CREATION_REQUEST:
            return true;
        case DEPOSIT_CREATION_FAILURE:
        case DEPOSIT_CREATION_SUCCESS:
        case DEPOSIT_CREATION_RESET:
            return false;
        default:
            return state;
    }
};

const hasErrorReducer = (state = initState.hasError, action) => {
    switch (action.type) {
        case DEPOSIT_CREATION_REQUEST:
        case DEPOSIT_CREATION_SUCCESS:
        case DEPOSIT_CREATION_RESET:
            return false;
        case DEPOSIT_CREATION_FAILURE:
            return true;
        default:
            return state;
    }
};

const responseReducer = (state = initState.response, action) => {
    switch (action.type) {
        case DEPOSIT_CREATION_REQUEST:
        case DEPOSIT_CREATION_RESET:
            return null;
        case DEPOSIT_CREATION_FAILURE:
        case DEPOSIT_CREATION_SUCCESS:
            return action.payload || null;
        default:
            return state;
    }
};

export const depositCreationReducer = combineReducers({
    isCreating: isCreatingReducer,
    hasError: hasErrorReducer,
    response: responseReducer
});

export default depositCreationReducer;
