import request from "./commons/api-request";

/**
 * 
 * @param {object} payload
 * @param {string} payload.userType
 * @param {string} payload.userName
 * @param {string} payload.password
 * @param {string} payload.captchaToken
 */
export const fetchLogin = (payload) => request({
    method: 'POST',
    resource: '/api/auth/login',
    body: payload,
    useAccessToken: false
});

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
export const fetchNewAccessToken = (payload) => request({
    method: 'POST',
    resource: '/api/auth/token',
    body: payload,
    useAccessToken: false
});

/**
 * 
 * @param {object} payload
 * @param {'customer'|'employee'|'administrator'} payload.userType
 * @param {string} payload.email
 */
export const createPasswordReset = (payload) => request({
    method: 'POST',
    resource: '/api/auth/password-reset',
    body: payload,
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
export const confirmPasswordReset = (payload) => request({
    method: 'POST',
    resource: '/api/auth/password-reset-confirmation',
    body: payload,
    useAccessToken: false
});
