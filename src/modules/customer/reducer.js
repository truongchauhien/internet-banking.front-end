import { combineReducers } from "redux";
import accountsReducer from './accounts/reducer';
import contactsReducer from "./contacts/reducer";
import transfersReducer from "./transfers/reducer";
import debtsReducer from "./debts/reducers";
import transactionsReducer from "./transaction-history/reducer";
import profileReducer from "./profile/reducer";

export const customerReducer = combineReducers({
    accounts: accountsReducer,
    contacts: contactsReducer,
    transfers: transfersReducer,
    debts: debtsReducer,
    transactions: transactionsReducer,
    profile: profileReducer
});

export default customerReducer;
