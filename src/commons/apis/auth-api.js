import request from "./commons/api-request"

/**
 * 
 * @param {object} payload 
 * @param {string} payload.userName
 * @param {string} payload.password
 */
const fetchLogin = (payload) => {
    return request({
        method: 'POST',
        resource: '/auth/login',
        useAccessToken: false,
        body: payload
    });
}

export { fetchLogin };
