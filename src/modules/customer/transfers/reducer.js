import { combineReducers } from "redux";
import intrabankReducer from "./intrabank/reducer";
import payDebtReducer from "./paydebt/reducer";

export const transfersReducer = combineReducers({
    intrabank: intrabankReducer,
    payDebt: payDebtReducer
});

export default transfersReducer;
