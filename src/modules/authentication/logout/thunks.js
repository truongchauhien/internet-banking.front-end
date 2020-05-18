import { logout } from './actions';
import { LOCALSTORAGE_KEYS_OF_USER_DATA } from '../commons/constants';

export const thunkedLogout = (payload) => (dispatch, getState) => {
    for (const localStorageKey of Object.values(LOCALSTORAGE_KEYS_OF_USER_DATA)) {
        localStorage.removeItem(localStorageKey);
    }

    dispatch(logout());
};
