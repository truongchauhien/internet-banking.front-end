import {
    LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS,
    LOGOUT,
    LOGIN_RESTORE_REQUEST,
    LOGIN_RESTORE_FAILURE,
    LOGIN_RESTORE_SUCCESS,
} from "./actions";
import { combineReducers } from "redux";

const initLoginState = {
    isAuthenticated: false,
    loginUI: {
        isFetching: false,
    },
    isRestoring: true,
    userData: {
        userId: null,
        userName: null,
        fullName: null,
        email: null,
        userType: null
    }
};

const isAuthenticatedReducer = (state = initLoginState.isAuthenticated, action) => {
    switch (action.type) {
        case LOGOUT:
            return false;
        case LOGIN_SUCCESS:
        case LOGIN_RESTORE_SUCCESS:
            return true;
        default:
            return state;
    }
};

const userDataReducer = (state = initLoginState.userData, action) => {
    switch (action.type) {
        case LOGOUT:
            return initLoginState.userData;
        case LOGIN_SUCCESS:
        case LOGIN_RESTORE_SUCCESS:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
};

const isRestoringReducer = (state = initLoginState.isRestoring, action) => {
    switch (action.type) {
        case LOGIN_RESTORE_REQUEST:
            return true;
        case LOGIN_RESTORE_FAILURE:
        case LOGIN_RESTORE_SUCCESS:
            return false;
        default:
            return state;
    }
};

const loginUIReducer = (state = initLoginState.loginUI, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, { isFetching: true });
        case LOGIN_FAILURE:
        case LOGIN_SUCCESS:
            return Object.assign({}, state, { isFetching: false });
        default:
            return state;
    }
};

const loginReducer = combineReducers({
    isAuthenticated: isAuthenticatedReducer,
    userData: userDataReducer,
    isRestoring: isRestoringReducer,
    loginUI: loginUIReducer,
});

export default loginReducer;
