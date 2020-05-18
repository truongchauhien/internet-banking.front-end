import { combineReducers } from "redux";
import banksReducer from "./banks/reducer";

export const commonsReducer = combineReducers({
    banks: banksReducer
});

export default commonsReducer;
