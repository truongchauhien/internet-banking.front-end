import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { customerCreationInputChange, customerCreationClear } from './actions';
import styles from './customer-creation.scss';
import { thunkedCreateCustomer } from './thunks';

export const CustomerCreation = (props) => {
    const dispatch = useDispatch();

    const { byId: accounts } = useSelector(state => state.entities.accounts);
    const { byId: customers } = useSelector(state => state.entities.customers);
    const {
        inputs, isFetching,
        createdCustomerId, createdCurrentAccountId
    } = useSelector(state => state.employee.customerCreation);

    const handleSubmitButtonClick = () => {
        dispatch(thunkedCreateCustomer(inputs, { mode: 'truncate' }));
    };

    const handleInputChange = (name, value) => {
        dispatch(customerCreationInputChange({
            name,
            value
        }));
    };

    const handleContinueButtonClick = () => {
        dispatch(customerCreationClear({
            inputs: true,
            createdCustomerId: true,
            createdCurrentAccountId: true,
        }));
    };

    if (!createdCustomerId) {
        return (
            <div className={styles.customerCreation}>
                <fieldset disabled={isFetching}>
                    <legend>Thông tin đăng nhập</legend>
                    <label>Tên tài khoản: <input value={inputs.userName} onChange={(event) => handleInputChange('userName', event.target.value)} /></label>
                    <label>Mật khẩu: <input value={inputs.password} onChange={(event) => handleInputChange('password', event.target.value)} /></label>
                </fieldset>
                <fieldset disabled={isFetching}>
                    <legend>Thông tin cá nhân</legend>
                    <label>Họ và Tên: <input value={inputs.fullName} onChange={(event) => handleInputChange('fullName', event.target.value)} /></label>
                    <label>Địa chỉ Email: <input value={inputs.email} onChange={(event) => handleInputChange('email', event.target.value)} /></label>
                    <label>Số điện thoại: <input value={inputs.phone} onChange={(event) => handleInputChange('phone', event.target.value)} /></label>
                </fieldset>
                <button onClick={handleSubmitButtonClick} disabled={isFetching}>Tạo tài khoản</button>
            </div>
        );
    } else {
        return (
            <div>
                <p>Tài khoản Internet Banking của khách hàng đã được đăng ký thành công.</p>
                <ul>
                    <li>Họ và Tên: {customers[createdCustomerId] && customers[createdCustomerId].fullName}</li><br />
                    <li>Tên đăng nhập: {customers[createdCustomerId] && customers[createdCustomerId].userName}</li><br />
                    <li>Số tài khoản thanh toán: {accounts[createdCurrentAccountId] && accounts[createdCurrentAccountId].accountNumber}</li><br />
                </ul>
                <button onClick={handleContinueButtonClick}>Tiếp tục ...</button>
            </div>
        );
    }
};

export default CustomerCreation;
