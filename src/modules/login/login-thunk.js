import _ from 'lodash';
import jwtdecode from 'jwt-decode';
import { loginRequest, loginSuccess, loginFailure } from "./login-actions";
import { fetchLogin } from "../../commons/apis/auth-api";

/**
 * 
 * @param {object} payload
 * @param {string} payload.userName
 * @param {string} payload.password
 */
const thunkedLogin = (payload) => {
    return (dispatch) => {
        dispatch(loginRequest());

        return fetchLogin(payload).then(response => {
            if (response.status !== 200) {
                return dispatch(loginFailure());
            }

            const { userId, userType, userName, fullName, email, accessToken, refreshToken } = response.body;
            const refreshTokenDecoded = jwtdecode(accessToken);
            localStorage.setItem('user-id', userId);
            localStorage.setItem('user-type', userType);
            localStorage.setItem('username', userName);
            localStorage.setItem('fullname', fullName);
            localStorage.setItem('email', email);
            localStorage.setItem('access-token', accessToken);
            localStorage.setItem('refresh-token', refreshToken);
            localStorage.setItem('access-token-expire-at', refreshTokenDecoded.exp);

            return dispatch(loginSuccess(response.body));
        }).catch(() => {
            return dispatch(loginFailure());
        });
    }
};

export { thunkedLogin };
