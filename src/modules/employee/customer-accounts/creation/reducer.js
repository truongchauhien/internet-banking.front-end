import { combineReducers } from "redux";
import { CREATE_CUSTOMER_ACCOUNT_SUCCESS, CUSTOMER_ACCOUNT_CREATION_CLEAR } from "./actions";

const initState = {
    createdAccountId: null
};

const createdAccountIdReducer = (state = initState.createdAccountId, action) => {
    switch (action.type) {
        case CREATE_CUSTOMER_ACCOUNT_SUCCESS:
            return action.payload.account.id;
        case CUSTOMER_ACCOUNT_CREATION_CLEAR:
            if (action.payload.clearAccount) {
                return initState.createdAccountId
            } else {
                return state;
            };
        default:
            return state;
    }
};

export const accountCreationReducer = combineReducers({
    createdAccountId: createdAccountIdReducer
});

export default accountCreationReducer;
