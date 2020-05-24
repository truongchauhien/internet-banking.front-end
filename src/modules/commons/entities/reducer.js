import { combineReducers } from 'redux';
import banksReducer from './banks/reducer';
import accountsReducer from './accounts/reducer';
import customersReducer from './customers/reducer';
import transactionsReducer from './transactions/reducer';
import depositsReducer from './deposits/reducer';

export const entitiesReducer = combineReducers({
    banks: banksReducer,
    accounts: accountsReducer,
    customers: customersReducer,
    transactions: transactionsReducer,
    deposits: depositsReducer
});

export default entitiesReducer;
