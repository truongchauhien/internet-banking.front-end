import { combineReducers } from "redux";
import intrabankReducer from "./intrabank-transfer/intrabank-transfer-reducer";

export const transferReducer = combineReducers({
    intrabankTransfer: intrabankReducer
});

export default transferReducer;
