import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ReCaptcha from 'react-google-recaptcha';
import { thunkedLogin } from './thunks';
import styles from './login.scss';

function Login(props) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [captchaToken, setCaptchaToken] = useState('');

    const isAuthenticated = useSelector(state => state.authentication.isAuthenticated);

    const dispatch = useDispatch();

    const submit = () => {
        if (!captchaToken) {
            alert('Vui lòng thực hiện bước xác thực bằng Google ReCAPTCHA.');
            return;
        }

        const spliterIndex = userName.indexOf(':');
        let userType = userName.substring(0, spliterIndex);
        const realUserName = userName.substring(spliterIndex + 1);

        if (!userType) {
            userType = 'customer';
        }

        dispatch(thunkedLogin({
            userType,
            userName: realUserName,
            password,
            captchaToken
        }));
    };

    const changeUserName = useCallback((args) => {
        setUserName(args.target.value);
    });

    const changePassword = useCallback((args) => {
        setPassword(args.target.value);
    });

    const changeCaptchaToken = useCallback((token) => {
        setCaptchaToken(token);
    });

    if (isAuthenticated) {
        return <Redirect to='/' />;
    } else {
        return (
            <div className={styles.loginForm}>
                <label>Tên đăng nhập: <input placeholder='Tên đăng nhập ...' onChange={changeUserName} /></label>
                <label>Mật khẩu: <input type='password' placeholder='Mật khẩu ...' onChange={changePassword} /></label>
                <div className={styles.captcha}>
                    <ReCaptcha sitekey={RECAPTCHA_SITE_KEY} onChange={changeCaptchaToken} />
                </div>
                <button type='submit' onClick={submit}>Đăng nhập</button>
            </div>
        );
    }
}

export default Login;
