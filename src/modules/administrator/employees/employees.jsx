import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmployeeCreationModal from './employee-creation/employee-creation-modal';
import EmployeeModificationModal from './employee-modification/employee-modification-modal';
import { employeeCreationModalOpenStatusChange, employeeCreationInit } from './employee-creation/actions';
import { employeeModificationInit, employeeModificationModelOpenStatusChange } from './employee-modification/actions';
import { thunkedFetchEmployees } from './thunks';
import { thunkedDeleteEmployee } from './employee-deletion/thunks';
import styles from './employees.scss';

export const Employees = (props) => {
    const dispatch = useDispatch();

    const { byId: employees, allIds: employeeIds } = useSelector(state => state.administrator.employees);

    useEffect(() => {
        dispatch(thunkedFetchEmployees());
    }, []);

    const handleCreateEmployeeButtonClick = () => {
        dispatch(employeeCreationInit());
        dispatch(employeeCreationModalOpenStatusChange(true));
    };

    const handleEditEmployeeButtonClick = (employeeId) => {
        const employee = employees[employeeId];
        dispatch(employeeModificationInit({
            fields: {
                ...(_.pick(employee, ['id', 'userName', 'fullName', 'email'])),
                password: ''
            }
        }));
        dispatch(employeeModificationModelOpenStatusChange(true));
    };

    const handleDeleteEmployeeButtonClick = (employeeId) => {
        const employee = employees[employeeId];
        const result = confirm(`Bạn có muốn xóa nhân viên "${employee.fullName} khỏi danh sách?"`);
        if (!result) return;
        dispatch(thunkedDeleteEmployee({ id: employeeId }));
    };

    return (
        <React.Fragment>
            <div>
                <button onClick={handleCreateEmployeeButtonClick}>Thêm nhân viên ...</button>
                <EmployeeCreationModal />
            </div>
            <div className={styles.employeeTable}>
                <table>
                    <thead>
                        <tr>
                            <th>Tên tài khoản</th>
                            <th>Họ và Tên</th>
                            <th>Email</th>
                            <th>Tùy chọn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeeIds && employeeIds.map(id => {
                            const employee = employees[id];
                            return (
                                <tr key={employee.id}>
                                    <td>
                                        {employee.userName}
                                    </td>
                                    <td>
                                        {employee.fullName}
                                    </td>
                                    <td>
                                        {employee.email}
                                    </td>
                                    <td>
                                        <button onClick={() => handleEditEmployeeButtonClick(employee.id)}>Thay đổi</button>
                                        <button onClick={() => handleDeleteEmployeeButtonClick(employee.id)}>Xóa</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <EmployeeModificationModal />
        </React.Fragment>
    );
};

export default Employees;
