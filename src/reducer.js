import { combineReducers } from "redux";
import authenticationReducer from "./modules/authentication/reducer";
import customerReducer from "./modules/customer/reducer";
import employeeReducer from "./modules/employee/reducer";
import administratorReducer from "./modules/administrator/reducer";
import entitiesReducer from './modules/commons/entities/reducer';

const rootReducer = combineReducers({
    authentication: authenticationReducer,
    customer: customerReducer,
    employee: employeeReducer,
    administrator: administratorReducer,
    entities: entitiesReducer
});

export default rootReducer;
