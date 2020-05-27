import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { passwordChangeInputChange } from './actions';
import { thunkedCreatePasswordChange } from './thunks';
import styles from './password-change.scss';

export const ChangePassword = (props) => {
    const dispatch = useDispatch();

    const { oldPassword, newPassword, newPasswordConfirmation } = useSelector(state => state.customer.profile.passwordChange.inputs);
    const isFetching = useSelector(state => state.customer.profile.passwordChange.isFetching);
    const customerId = useSelector(state => state.authentication.userData.userId);

    const handleInputChange = (name, value) => {
        dispatch(passwordChangeInputChange({
            name: name,
            value: value
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
                    onChange={(event) => handleInputChange('oldPassword', event.target.value)}
                />
            </label>
            <label>Mật khẩu mới:
                <input type='password'
                    value={newPassword}
                    onChange={(event) => handleInputChange('newPassword', event.target.value)}
                />
            </label>
            <label>Xác nhận mật khẩu mới:
                <input type='password'
                    value={newPasswordConfirmation}
                    onChange={(event) => handleInputChange('newPasswordConfirmation', event.target.value)}
                />
            </label>
            <button onClick={handleSubmitClick} disabled={isFetching}>Lưu thay đổi</button>
        </div>
    );
};

export default ChangePassword;
