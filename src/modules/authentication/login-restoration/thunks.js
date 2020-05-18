import _ from 'lodash';
import jwtdecode from 'jwt-decode';
import {
    loginRestoreRequest, loginRestoreFailure, loginRestoreSuccess
} from './actions';
import { fetchNewAccessToken } from '../../../commons/apis/authentication-api';
import { LOCALSTORAGE_KEYS_OF_USER_DATA } from '../commons/constants';

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
        localStorage.setItem('accessTokenExpireAt', refreshTokenDecoded.exp * 1000);

        return dispatch(loginRestoreSuccess(
            _.omit(storedUserData, [
                'accessToken', 'refreshToken', 'accessTokenExpireAt'
            ])
        ));
    } catch {
        dispatch(loginRestoreFailure());
    }
};
