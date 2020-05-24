import { combineReducers } from 'redux';
import customerCreationReducer from './customer-creation/reducer';
import customerAccountsReducer from './customer-accounts/reducer';
import depositCreationReducer from './deposit-creation/reducer';
import transactionHistoryReducer from './transaction-history/reducer';

export const employeeReducer = combineReducers({
    customerCreation: customerCreationReducer,
    customerAccounts: customerAccountsReducer,
    depositCreation: depositCreationReducer,
    transactionHistory: transactionHistoryReducer
});

export default employeeReducer;
