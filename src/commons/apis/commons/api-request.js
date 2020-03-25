import jwtdecode from 'jwt-decode';
import { fetchNewAccessToken } from '../auth-api';

const convertToString = (value) => {
    // TODO:
    return String(value);
};

const buildQueryString = (params) => {
    if (!params) {
        return '';
    }

    const pairs = [];
    for (const key in params) {
        const value = params[key];
        if (value !== undefined) {
            const encodedValue = encodeURIComponent(convertToString(value));
            pairs.push(`${key}=${encodedValue}`);
        }
    }

    return pairs.join('&');
};

const buildUrl = (useHttps, host, port, path, params) => {
    const queryString = buildQueryString(params);
    return `${useHttps ? 'https' : 'http'}://${host}:${port}${path}${queryString ? ('?' + queryString) : ''}`;
};

/**
 * 
 * @param {object} options
 * @param {'HEAD'|'GET'|'POST'|'PUT'|'PATCH'|'DELETE'} options.method
 * @param {string} options.resource
 * @param {object} options.params
 * @param {object} options.body
 * @param {boolean} options.useAccessToken
 */
const request = async (options) => {
    const { method, resource, params, body, useAccessToken } = options;
    const headers = {
        'Content-Type': 'application/json'
    };

    if (useAccessToken) {
        const expireAtValue = localStorage.getItem('access-token-expire-at');
        if (!expireAtValue) {
            localStorage.setItem('access-token-expire-at', Date.now());
        }

        const expireAt = new Date(Number.parseInt(expireAtValue));
        const differenceMiliseconds = expireAt.getTime() - Date.now();
        const differenceMinutes = differenceMiliseconds / 1000 / 60;

        if (differenceMinutes <= 0.5) {
            const userId = localStorage.getItem('user-id');
            const userType = localStorage.getItem('user-type');
            const refreshToken = localStorage.getItem('refresh-token');
            const response = await fetchNewAccessToken({
                userId,
                userType,
                refreshToken
            });

            if (!response.ok) {
                console.log('Please logout and login again.');
                return;
            }

            const { refreshToken: newRefreshToken, accessToken: newAccessToken } = response.body;

            const refreshTokenDecoded = jwtdecode(newAccessToken);
            localStorage.setItem('access-token', newAccessToken);
            localStorage.setItem('refresh-token', newRefreshToken);
            localStorage.setItem('access-token-expire-at', refreshTokenDecoded.exp * 1000); // exp: number of seconds.
        }

        const accessToken = localStorage.getItem('access-token');
        headers['Authentication'] = `Bearer ${accessToken}`;
    }

    const url = buildUrl(USE_HTTPS, API_HOST, API_PORT, resource, params);
    const response = await fetch(url, {
        mode: 'cors',
        method: method,
        headers: headers,
        body: JSON.stringify(body)
    });

    let returnBody = {};
    const responseContentType = response.headers.get('content-type');
    if (responseContentType && responseContentType.includes('application/json')) {
        returnBody = await response.json();
    }

    return {
        body: returnBody,
        status: response.status,
        ok: response.ok
    };
};

export default request;
