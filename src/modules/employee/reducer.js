import { combineReducers } from "redux";
import customerCreationReducer from "./customer-creation/reducer";
import depositCreationReducer from "./deposit-creation/reducer";
import transactionHistoryReducer from "./transaction-history/reducer";

export const employeeReducer = combineReducers({
    customerCreation: customerCreationReducer,
    depositCreation: depositCreationReducer,
    transactionHistory: transactionHistoryReducer
});

export default employeeReducer;
