import React, { useEffect } from 'react';
import TopNavigation from './top-navigation/top-navigation';
import { NavLink, useRouteMatch, Switch, Route } from 'react-router-dom';
import SideBar from '../../commons/components/sidebar/sidebar';
import Employees from './employees/employees';
import Reconciliations from './reconciliations/reconciliations';
import styles from './administrator.scss';
import { useDispatch } from 'react-redux';
import { thunkedFetchBanks } from '../commons/entities/banks/thunks';

export const Administrator = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(thunkedFetchBanks());
    }, []);

    const match = useRouteMatch();

    return (
        <React.Fragment>
            <TopNavigation />
            <SideBar>
                <SideBar.Menu>
                    <SideBar.Menu.Item>
                        <NavLink to={`${match.url}/employees`} activeClassName={styles.activeSidebarMenuItem}>
                            Quản lý nhân viên
                        </NavLink>
                    </SideBar.Menu.Item>
                    <SideBar.Menu.Item>
                        <NavLink to={`${match.url}/reconciliations`} activeClassName={styles.activeSidebarMenuItem}>
                            Danh sách giao dịch
                        </NavLink>
                    </SideBar.Menu.Item>
                </SideBar.Menu>
                <SideBar.Content>
                    <Switch>
                        <Route path={`${match.path}/employees`}>
                            <Employees />
                        </Route>
                        <Route path={`${match.path}/reconciliations`}>
                            <Reconciliations />
                        </Route>
                    </Switch>
                </SideBar.Content>
            </SideBar>
        </React.Fragment>
    );
};

export default Administrator;
