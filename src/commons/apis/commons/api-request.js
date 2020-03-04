import jwtdecode from 'jwt-decode';

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
    return `${useHttps ? 'https' : 'http'}://${host}:${port}/${path}${queryString ? ('?' + queryString) : ''}`;
};

/**
 * 
 * @param {object} options
 * @param {'GET'|'POST'|'PUT'|'PATCH'|'HEAD'} options.method
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
        const difference = Date.now() - expireAt.getTime();
        const minutesLeft = difference / 1000 / 60;

        if (minutesLeft <= 0.5) {
            const userId = localStorage.getItem('user-id');
            const refreshToken = localStorage.getItem('refresh-token');
            const response = await request({
                requestMethod: 'POST',
                resource: '/token',
                body: {
                    userId,
                    refreshToken
                },
                isTokenIncluded: false
            });

            const { refreshToken: newRefreshToken, accessToken: newAccessToken } = response;
            const refreshTokenDecoded = jwtdecode(newAccessToken);
            localStorage.setItem('access-token', newAccessToken);
            localStorage.setItem('refresh-token', newRefreshToken);
            localStorage.setItem('access-token-expire-at', refreshTokenDecoded.exp);
        }

        const accessToken = localStorage.getItem('access-token');
        headers['Authentication'] = `Bearer ${accessToken}`;
    }

    const url = buildUrl(USE_HTTPS, API_HOST, API_PORT, resource, params);
    let response;
    try {
        response = await fetch(url, {
            mode: 'cors',
            method: method,
            headers: headers,
            body: JSON.stringify(body)
        });
    } catch {
        return Promise.reject('Something went wrong while fetching api!');
    }

    return {
        body: (method === 'HEAD') ? {} : await response.json(),
        status: response.status
    };
};

export default request;
