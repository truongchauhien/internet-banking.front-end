import { combineReducers } from "redux";
import { LOGIN_SUCCESS } from "./login/actions";
import { LOGOUT } from "./logout/actions";
import { LOGIN_RESTORE_SUCCESS } from "./login-restoration/actions";
import loginReducer from "./login/reducer";
import passwordResetReducer from './password-reset/reducer';
import loginRestorationReducer from "./login-restoration/reducer";

const initState = {
    isAuthenticated: false,
    userData: {
        userId: null,
        userName: null,
        fullName: null,
        email: null,
        userType: null
    }
};

const isAuthenticatedReducer = (state = initState.isAuthenticated, action) => {
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

const userDataReducer = (state = initState.userData, action) => {
    switch (action.type) {
        case LOGOUT:
            return initState.userData;
        case LOGIN_SUCCESS:
        case LOGIN_RESTORE_SUCCESS:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
};

const authenticationReducer = combineReducers({
    isAuthenticated: isAuthenticatedReducer,
    userData: userDataReducer,
    login: loginReducer,
    loginRestoration: loginRestorationReducer,
    passwordReset: passwordResetReducer
});

export default authenticationReducer;
