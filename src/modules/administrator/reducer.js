import { combineReducers } from "redux";
import employeesReducer from "./employees/reducer";
import reconciliationsReducer from "./reconciliations/reducer";

export const administratorReducer = combineReducers({
    employees: employeesReducer,
    reconciliations: reconciliationsReducer
});

export default administratorReducer;
