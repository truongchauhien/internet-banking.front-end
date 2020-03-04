import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import ReCaptcha from 'react-google-recaptcha';
import { thunkedLogin } from './login-thunk';

function Login(props) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [captchaToken, setCaptchaToken] = useState('');

    const isAuthenticated = useSelector(state => state.login.isAuthenticated);

    const dispatch = useDispatch();

    const submit = useCallback(() => {
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
    });

    const changeUserName = useCallback((args) => {
        setUserName(args.target.value);
    });

    const changePassword = useCallback((args) => {
        setPassword(args.target.value);
    });

    const changeCaptchaToken = useCallback((token) => {
        setCaptchaToken(token);
    });

    return (
        isAuthenticated ?
            <Redirect to='/' />
            :
            <Form>
                <Form.Field>
                    <label>Tên đăng nhập</label>
                    <input placeholder='Tên đăng nhập ...' onChange={changeUserName} />
                </Form.Field>
                <Form.Field>
                    <label>Mật khẩu</label>
                    <input type='password' placeholder='Mật khẩu ...' onChange={changePassword} />
                </Form.Field>
                <Form.Field>
                    <ReCaptcha sitekey={RECAPTCHA_SITE_KEY} onChange={changeCaptchaToken} />
                </Form.Field>
                <Button type='submit' onClick={submit}>Đăng nhập</Button>
            </Form>
    );
}

export default Login;
