import { combineReducers } from "redux";
import authenticationReducer from "./modules/authentication/reducer";
import customerReducer from "./modules/customer/reducer";

const rootReducer = combineReducers({
    authentication: authenticationReducer,
    customer: customerReducer
});

export default rootReducer;
