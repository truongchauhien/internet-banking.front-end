import React from 'react';
import Modal from '../../../../commons/components/modal/modal';
import { useSelector, useDispatch } from 'react-redux';
import { employeeModificationModalInputChange, employeeModificationModelOpenStatusChange } from './actions';
import { thunkedUpdateEmployee } from './thunks';
import styles from './employee-modification-modal.scss';

export const EmployeeModificationModal = (props) => {
    const dispatch = useDispatch();

    const { isModalOpen, fields, isFetching } = useSelector(state => state.administrator.employees.employeeModification);

    const handleModalClickOutside = () => {
        dispatch(employeeModificationModelOpenStatusChange(false));
    };

    const handleInputChange = (name, value) => {
        dispatch(employeeModificationModalInputChange({
            name,
            value
        }));
    };

    const handleCancelClick = () => {
        dispatch(employeeModificationModelOpenStatusChange(false));
    };

    const handleSubmitClick = () => {
        dispatch(thunkedUpdateEmployee(fields));
    };

    return (
        <Modal isOpen={isModalOpen} onClickOutside={handleModalClickOutside}>
            <Modal.Content>
                <div className={styles.employeeModificationModalContent}>
                    <fieldset>
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
                    <fieldset>
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

export default EmployeeModificationModal;
