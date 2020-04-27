import { combineReducers } from "redux";
import accountsReducer from './accounts/accounts-reducer';
import contactsReducer from "./contacts/contacts-reducer";
import transfersReducer from "./transfers/reducer";
import linkedBanksReducer from "./linked-banks/reducer";
import debtsReducer from "./debts/reducers";

export const customerReducer = combineReducers({
    accounts: accountsReducer,
    contacts: contactsReducer,
    transfers: transfersReducer,
    linkedBanks: linkedBanksReducer,
    debts: debtsReducer
});

export default customerReducer;
