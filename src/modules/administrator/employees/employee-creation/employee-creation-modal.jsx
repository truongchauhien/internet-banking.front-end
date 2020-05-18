import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../../commons/components/modal/modal';
import { employeeCreationModalOpenStatusChange, employeeCreationModalInputChange } from './actions';
import { thunkedCreateEmployee } from './thunks';
import styles from './employee-creation-modal.scss';

export const EmployeeCreationModal = (props) => {
    const dispatch = useDispatch();

    const { isModalOpen, fields, isFetching } = useSelector(state => state.administrator.employees.employeeCreation);

    const handleEmployeeCreationModalClickOutside = () => {
        if (isFetching) return;
        dispatch(employeeCreationModalOpenStatusChange(false));
    };

    const handleInputChange = (name, value) => {
        dispatch(employeeCreationModalInputChange({
            name,
            value
        }));
    };

    const handleCancelClick = () => {
        dispatch(employeeCreationModalOpenStatusChange(false));
    };

    const handleSubmitClick = () => {
        dispatch(thunkedCreateEmployee(fields));
    };

    return (
        <Modal isOpen={isModalOpen} onClickOutside={handleEmployeeCreationModalClickOutside}>
            <Modal.Content>
                <div className={styles.employeeCreationModalContent}>
                    <fieldset disabled={isFetching}>
                        <legend>Thông tin đăng nhập</legend>
                        <label>
                            Tên tài khoản:
                        <input value={fields.userName} onChange={(event) => handleInputChange('userName', event.target.value)} />
                        </label>
                        <label>
                            Mật khẩu:
                        <input value={fields.password} onChange={(event) => handleInputChange('password', event.target.value)} type='password' />
                        </label>
                    </fieldset>
                    <fieldset disabled={isFetching}>
                        <legend>Thông tin cá nhân</legend>
                        <label>
                            Họ và Tên:
                        <input value={fields.fullName} onChange={(event) => handleInputChange('fullName', event.target.value)} />
                        </label>
                        <label>
                            Email:
                        <input value={fields.email} onChange={(event) => handleInputChange('email', event.target.value)} type='email' />
                        </label>
                    </fieldset>
                    <button onClick={handleCancelClick} disabled={isFetching}>Hủy</button>
                    <button onClick={handleSubmitClick} disabled={isFetching}>Đồng ý</button>
                </div>
            </Modal.Content>
        </Modal>
    );
};

export default EmployeeCreationModal;
