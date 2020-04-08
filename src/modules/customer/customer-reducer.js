import { combineReducers } from "redux";
import accountsReducer from './commons/reducers/accounts-reducer';
import contactsReducer from "./commons/reducers/contacts-reducer";

export const customerReducer = combineReducers({
    accounts: accountsReducer,
    contacts: contactsReducer
});

export default customerReducer;
