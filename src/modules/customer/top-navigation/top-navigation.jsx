import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch, useHistory, Link } from 'react-router-dom';
import Dropdown from '../../../commons/components/dropdown/dropdown';
import { thunkedLogout } from '../../authentication/thunks';
import styles from './top-navigation.scss';

export const TopNavigation = (props) => {
    const match = useRouteMatch();
    const reactRouterHistory = useHistory();

    const dispatch = useDispatch();
    const { fullName } = useSelector(state => state.authentication.userData);

    const handleDropdownProfileClick = useCallback(() => {
        reactRouterHistory.push(`${match.url}/profile`);
    }, [match]);

    const handleDropdownLogoutClick = () => {
        dispatch(thunkedLogout());
    };

    return (
        <div className={styles.topnav}>
            <Link to='/'>Internet Banking</Link>
            <Dropdown className={styles.userDropdown} label={fullName}>
                <Dropdown.Item onClick={handleDropdownProfileClick}>Tài khoản</Dropdown.Item>
                <Dropdown.Item onClick={handleDropdownLogoutClick}>Đăng xuất</Dropdown.Item>
            </Dropdown>
        </div>
    );
};

export default TopNavigation;
