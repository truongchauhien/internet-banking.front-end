import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { thunkedCreatePasswordChange } from './thunks';
import styles from './password-change.scss';
import { passwordChangeInputChange } from './actions';

export const ChangePassword = (props) => {
    const dispatch = useDispatch();

    const { oldPassword, newPassword, newPasswordConfirmation } = useSelector(
        state => state.customer.profile.passwordChange.inputForm
    );
    const isFetching = useSelector(state => state.customer.profile.passwordChange.isFetching);
    const customerId = useSelector(state => state.authentication.userData.userId);

    const handleOldPasswordInputChange = (event) => {
        dispatch(passwordChangeInputChange({
            name: 'oldPassword',
            value: event.target.value
        }));
    };

    const handleNewPasswordInputChange = (event) => {
        dispatch(passwordChangeInputChange({
            name: 'newPassword',
            value: event.target.value
        }));
    };

    const handleNewPasswordConfirmationInputChange = (event) => {
        dispatch(passwordChangeInputChange({
            name: 'newPasswordConfirmation',
            value: event.target.value
        }));
    };

    const handleSubmitClick = () => {
        if (oldPassword === '' || newPassword === '' || newPasswordConfirmation === '') {
            return alert('Các ô nhập giá trị không được để trống.');
        }
        
        if (newPassword !== newPasswordConfirmation) {
            return alert('Mật khẩu xác nhận không khớp.');
        }

        dispatch(thunkedCreatePasswordChange({
            customerId,
            oldPassword,
            newPassword
        }));
    };

    return (
        <div className={styles.passwordChange}>
            <label>Mật khẩu cũ:
                <input type='password'
                    value={oldPassword}
                    onChange={handleOldPasswordInputChange}
                />
            </label>
            <label>Mật khẩu mới:
                <input type='password'
                    value={newPassword}
                    onChange={handleNewPasswordInputChange}
                />
            </label>
            <label>Xác nhận mật khẩu mới:
                <input type='password'
                    value={newPasswordConfirmation}
                    onChange={handleNewPasswordConfirmationInputChange}
                />
            </label>
            <button onClick={handleSubmitClick} disabled={isFetching}>Lưu thay đổi</button>
        </div>
    );
};

export default ChangePassword;
