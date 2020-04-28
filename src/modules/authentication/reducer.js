import { combineReducers } from "redux";
import {
    LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS,
    LOGOUT,
    LOGIN_RESTORE_REQUEST,
    LOGIN_RESTORE_FAILURE,
    LOGIN_RESTORE_SUCCESS,
} from "./actions";
import passwordResetReducer from './password-reset/reducer';

const initAuthenticationState = {
    isAuthenticated: false,
    isRestoring: true,
    userData: {
        userId: null,
        userName: null,
        fullName: null,
        email: null,
        userType: null
    },
    login: {
        isFetching: false
    }
};

const isAuthenticatedReducer = (state = initAuthenticationState.isAuthenticated, action) => {
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

const userDataReducer = (state = initAuthenticationState.userData, action) => {
    switch (action.type) {
        case LOGOUT:
            return initAuthenticationState.userData;
        case LOGIN_SUCCESS:
        case LOGIN_RESTORE_SUCCESS:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
};

const isRestoringReducer = (state = initAuthenticationState.isRestoring, action) => {
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

const loginReducer = (state = initAuthenticationState.login, action) => {
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

const authentication = combineReducers({
    isAuthenticated: isAuthenticatedReducer,
    isRestoring: isRestoringReducer,
    userData: userDataReducer,
    login: loginReducer,
    passwordReset: passwordResetReducer
});

export default authentication;
