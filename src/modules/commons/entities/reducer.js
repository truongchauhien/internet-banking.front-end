import { combineReducers } from 'redux';
import banksReducer from './banks/reducer';
import accountsReducer from './accounts/reducer';
import customersReducer from './customers/reducer';
import transactionsReducer from './transactions/reducer';

export const entitiesReducer = combineReducers({
    banks: banksReducer,
    accounts: accountsReducer,
    customers: customersReducer,
    transactions: transactionsReducer
});

export default entitiesReducer;
