import { combineReducers } from "redux";
import payDebtReducer from "./paydebt/reducer";
import intrabankInterbankReducer from './intrabank-interbank/reducer';

export const transfersReducer = combineReducers({
    intrabankInterbank: intrabankInterbankReducer,
    payDebt: payDebtReducer
});

export default transfersReducer;
