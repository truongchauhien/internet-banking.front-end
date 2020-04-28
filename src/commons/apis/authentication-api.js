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
 * @returns {{
 *      ok: boolean,
 *      status: number,
 *      body: {
 *          userId: number,
 *          userType: string,
 *          accessToken: string,
 *          refreshToken: string
 *      }
 * }}
 */
export const fetchNewAccessToken = (payload) => {
    return request({
        method: 'POST',
        resource: '/api/auth/token',
        body: payload,
        useAccessToken: false
    });
};

/**
 * 
 * @param {object} payload
 * @param {'customer'|'employee'|'administrator'} payload.userType
 * @param {string} payload.email
 */
export const createPasswordReset = ({ userType, ...body }) => request({
    method: 'POST',
    resource: '/api/auth/password-reset',
    params: {
        userType
    },
    body,
    useAccessToken: false
});

/**
 * 
 * @param {object} payload
 * @param {'customer'|'employee'|'administrator'} payload.userType
 * @param {string} payload.email
 * @param {number} payload.otp
 * @param {string} payload.newPassword
 */
export const confirmPasswordReset = ({ userType, ...body }) => request({
    method: 'POST',
    resource: '/api/auth/password-reset-confirmation',
    params: {
        userType
    },
    body,
    useAccessToken: false
});
