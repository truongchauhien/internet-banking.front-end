import request from "./commons/api-request";

/**
 * 
 * @param {object} payload 
 * @param {string} payload.userName
 * @param {string} payload.password
 */
export const fetchLogin = (payload) => {
    return request({
        method: 'POST',
        resource: '/api/auth/login',
        useAccessToken: false,
        body: payload
    });
}

/**
 * 
 * @param {object} payload
 * @param {string} payload.userType
 * @param {string} payload.userId
 * @param {string} payload.refreshToken
 */
export const fetchNewAccessToken = (payload) => {
    return request({
        method: 'POST',
        resource: '/api/auth/token',
        body: payload,
        useAccessToken: false
    });
};
