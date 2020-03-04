import { LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS } from "./login-actions";

const userId = localStorage.getItem('user-id');
const userType = localStorage.getItem('user-type');
const userName = localStorage.getItem('username');
const fullName = localStorage.getItem('fullname');
const email = localStorage.getItem('email');

const initLoginState = {
    isAuthenticated: userId ? true : false,
    userId: userId ?? '',
    userName: userName ?? '',
    fullName: fullName ?? '',
    email: email ?? '',
    userType: userType ?? '',
    isFetching: false
};

const loginReducer = (state = initLoginState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                isAuthenticated: false,
                isFetching: false
            });
        case LOGIN_SUCCESS:
            return Object.assign({}, state, action.payload, {
                isAuthenticated: true,
                isFetching: false
            });
        default:
            return state;
    }
};

export default loginReducer;
