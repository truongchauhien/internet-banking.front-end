import _ from 'lodash';
import jwtdecode from 'jwt-decode';
import { loginRequest, loginFailure, loginSuccess } from "./actions";
import { fetchLogin } from "../../../commons/apis/authentication-api";
import { LOCALSTORAGE_KEYS_OF_USER_DATA } from '../commons/constants';

/**
 * 
 * @param {object} payload
 * @param {string} payload.userType
 * @param {string} payload.userName
 * @param {string} payload.password
 * @param {string} payload.captchaToken
 */
export const thunkedLogin = (payload) => async (dispatch, getState) => {
    dispatch(loginRequest());
    try {
        const response = await fetchLogin(payload);
        if (response.status !== 200) {
            return dispatch(loginFailure());
        }

        const refreshTokenDecoded = jwtdecode(response.body.accessToken);
        const userData = {
            ...response.body,
            accessTokenExpireAt: refreshTokenDecoded.exp * 1000
        };

        for (const localStorageKey of Object.values(LOCALSTORAGE_KEYS_OF_USER_DATA)) {
            localStorage.setItem(localStorageKey, userData[localStorageKey]);
        }

        return dispatch(loginSuccess(
            _.omit(userData, [
                'accessToken', 'refreshToken', 'accessTokenExpireAt'
            ])
        ));
    } catch (err) {
        return dispatch(loginFailure());
    }
};
