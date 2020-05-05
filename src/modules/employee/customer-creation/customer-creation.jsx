import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { customerCreationInputChange, customerCreationReset } from './actions';
import styles from './customer-creation.scss';
import { thunkedCreateCustomer } from './thunks';

export const CustomerCreation = (props) => {
    const dispatch = useDispatch();
    const inputs = useSelector(state => state.employee.customerCreation.inputs);
    const isCreating = useSelector(state => state.employee.customerCreation.isCreating);
    const createdCustomer = useSelector(state => state.employee.customerCreation.createdCustomer);

    const handleSubmitButtonClick = () => {
        dispatch(thunkedCreateCustomer(inputs));
    };

    const handleInputChange = (name, value) => {
        dispatch(customerCreationInputChange({
            name,
            value
        }));
    };

    const handleContinueButtonClick = () => {
        dispatch(customerCreationReset());
    };

    if (!createdCustomer) {
        return (
            <div className={styles.customerCreation}>
                <fieldset disabled={isCreating}>
                    <legend>Thông tin đăng nhập</legend>
                    <label>Tên tài khoản: <input value={inputs.userName} onChange={(event) => handleInputChange('userName', event.target.value)} /></label>
                    <label>Mật khẩu: <input value={inputs.password} onChange={(event) => handleInputChange('password', event.target.value)} /></label>
                </fieldset>
                <fieldset disabled={isCreating}>
                    <legend>Thông tin cá nhân</legend>
                    <label>Họ và Tên: <input value={inputs.fullName} onChange={(event) => handleInputChange('fullName', event.target.value)} /></label>
                    <label>Địa chỉ Email: <input value={inputs.email} onChange={(event) => handleInputChange('email', event.target.value)} /></label>
                    <label>Số điện thoại: <input value={inputs.phone} onChange={(event) => handleInputChange('phone', event.target.value)} /></label>
                </fieldset>
                <button onClick={handleSubmitButtonClick} disabled={isCreating}>Tạo tài khoản</button>
            </div>
        );
    } else {
        return (
            <div>
                <p>Tài khoản khách hàng đã được đăng ký thành công.</p>
                <button onClick={handleContinueButtonClick}>Tiếp tục ...</button>
            </div>
        );
    }
};

export default CustomerCreation;
