import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Dropdown from '../../../commons/components/dropdown/dropdown';
import { thunkedLogout } from '../../authentication/logout/thunks';
import styles from './top-navigation.scss';

export const TopNavigation = (props) => {
    const dispatch = useDispatch();
    const { fullName } = useSelector(state => state.authentication.userData);

    const handleDropdownLogoutClick = () => {
        dispatch(thunkedLogout());
    };

    return (
        <div className={styles.topnav}>
            <Link to='/'>Internet Banking: Quản trị viên</Link>
            <Dropdown className={styles.userDropdown} label={fullName}>
                <Dropdown.Item onClick={handleDropdownLogoutClick}>Đăng xuất</Dropdown.Item>
            </Dropdown>
        </div>
    );
};

export default TopNavigation;
