import { combineReducers } from "redux";
import loginReducer from "./modules/login/login-reducer";
import customerReducer from "./modules/customer/customer-reducer";

const rootReducer = combineReducers({
    login: loginReducer,
    customer: customerReducer
});

export default rootReducer;
