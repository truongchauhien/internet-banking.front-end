import _ from 'lodash';
import jwtdecode from 'jwt-decode';
import {
    loginRequest, loginSuccess, loginFailure,
    logout,
    loginRestoreRequest, loginRestoreFailure, loginRestoreSuccess
} from "./actions";
import { fetchLogin, fetchNewAccessToken } from "../../commons/apis/authentication-api";

const LOCALSTORAGE_KEYS_OF_USER_DATA = {
    userId: 'userId',
    userType: 'userType',
    userName: 'userName',
    fullName: 'fullName',
    email: 'email',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    accessTokenExpireAt: 'accessTokenExpireAt'
};

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
            accessTokenExpireAt: refreshTokenDecoded
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

export const thunkedLoginRestore = (payload) => async (dispatch, getState) => {
    dispatch(loginRestoreRequest());

    const storedUserData = {};
    for (const localStorageKey of Object.values(LOCALSTORAGE_KEYS_OF_USER_DATA)) {
        storedUserData[localStorageKey] = localStorage.getItem(localStorageKey);
    }

    if (storedUserData.userId === null || storedUserData.userType === null || storedUserData.refreshToken === null) {
        return dispatch(loginRestoreFailure());
    }

    try {
        const response = await fetchNewAccessToken({
            userId: storedUserData.userId,
            userType: storedUserData.userType,
            refreshToken: storedUserData.refreshToken
        });


        if (!response.ok) {
            dispatch(loginRestoreFailure());
            return dispatch(thunkedLogout());
        }

        const refreshTokenDecoded = jwtdecode(response.body.accessToken);
        localStorage.setItem('accessToken', response.body.accessToken);
        localStorage.setItem('refreshToken', response.body.refreshToken);
        localStorage.setItem('accessTokenExpireAt', refreshTokenDecoded.exp);

        return dispatch(loginRestoreSuccess(
            _.omit(storedUserData, [
                'accessToken', 'refreshToken', 'accessTokenExpireAt'
            ])
        ));
    } catch {
        dispatch(loginRestoreFailure());
    }
};

export const thunkedLogout = (payload) => (dispatch, getState) => {
    for (const localStorageKey of Object.values(LOCALSTORAGE_KEYS_OF_USER_DATA)) {
        localStorage.removeItem(localStorageKey);
    }

    dispatch(logout());
};
