import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { thunkedCreatePasswordReset, thunkedConfirmPasswordReset } from './thunks';
import styles from './password-reset.scss';

export const PasswordReset = (props) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [userType, setUserType] = useState('customer');
    const [realEmail, setRealEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const { isFetching, stage } = useSelector(state => state.authentication.passwordReset);

    const handleEmailInputChange = (event) => {
        setEmail(event.target.value);
    };

    const handleConfirmEmailClick = () => {
        const spliterIndex = email.indexOf(':');
        let userType = email.substring(0, spliterIndex) || 'customer';
        const realEmail = email.substring(spliterIndex + 1);

        setUserType(userType);
        setRealEmail(realEmail);
        dispatch(thunkedCreatePasswordReset({
            userType: userType,
            email: realEmail
        }));
    };

    const handleOtpInputChange = (event) => {
        setOtp(event.target.value);
    };

    const handleNewPasswordInputChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handleConfirmOtpClick = () => {
        dispatch(thunkedConfirmPasswordReset({
            userType: userType,
            email: realEmail,
            otp: Number(otp),
            newPassword
        }));
    };

    return (
        <div className={`${styles.passwordReset} ${isFetching ? styles.passwordResetDisabled : ''}`}>
            {stage === 'enter-email' && (
                <div>
                    <label>Quý khách vui lòng nhập địa chỉ email đã dùng để đăng ký tài khoản:
                    <input value={email} onChange={handleEmailInputChange} />
                    </label>
                    <button onClick={handleConfirmEmailClick}>Xác nhận</button>
                </div>
            )}
            {stage === 'enter-otp' && (
                <div>
                    <label>Mã xác thực OTP (đã được gửi vào email của quý khách):
                        <input value={otp} onChange={handleOtpInputChange} />
                    </label>

                    <label>Mật khẩu mới:
                        <input type='password' value={newPassword} onChange={handleNewPasswordInputChange} />
                    </label>
                    <button onClick={handleConfirmOtpClick}>Xác nhận</button>
                </div>
            )}
            {stage === 'finish' && (
                <div>
                    <p>Quý khách đã thay đổi mật khẩu thành công.</p>
                    <Link to='/login'>Đăng nhập</Link>
                </div>
            )}
        </div>
    );
};

export default PasswordReset;
