import { combineReducers } from "redux";
import accountsReducer from './accounts/accounts-reducer';
import contactsReducer from "./contacts/contacts-reducer";

export const customerReducer = combineReducers({
    accounts: accountsReducer,
    contacts: contactsReducer
});

export default customerReducer;
