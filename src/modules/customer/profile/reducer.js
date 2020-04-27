import { combineReducers } from "redux";
import passwordChangeReducer from "./password-change/reducer";

export const profileReducer = combineReducers({
    passwordChange: passwordChangeReducer
});

export default profileReducer;
