import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducer";
import reduxThunkMiddleware from "redux-thunk";
import webSocketMiddleware from './modules/commons/websocket/websocket-redux-middleware';

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(reduxThunkMiddleware, webSocketMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;
