import React from 'react';
import { Switch, Route, useRouteMatch, NavLink } from 'react-router-dom';
import SideBar from '../../commons/components/sidebar/sidebar';
import TopNavigation from './top-navigation/top-navigation';
import CustomerCreation from './customer-creation/customer-creation';
import DepositCreation from './deposit-creation/deposit-creation';
import styles from './employee.scss';
import TransactionHistory from './transaction-history/transaction-history';

export const Employee = (props) => {
    const match = useRouteMatch();

    return (
        <React.Fragment>
            <TopNavigation />
            <SideBar>
                <SideBar.Menu>
                    <SideBar.Menu.Item>
                        <NavLink to={`${match.url}/customer-creation`} activeClassName={styles.activeSidebarMenuItem}>
                            Tạo tài khoản khách hàng
                        </NavLink>
                    </SideBar.Menu.Item>
                    <SideBar.Menu.Item>
                        <NavLink to={`${match.url}/deposit`} activeClassName={styles.activeSidebarMenuItem}>
                            Nạp tiền
                        </NavLink>
                    </SideBar.Menu.Item>
                    <SideBar.Menu.Item>
                        <NavLink to={`${match.url}/transaction-history`} activeClassName={styles.activeSidebarMenuItem}>
                            Lịch sử giao dịch
                        </NavLink>
                    </SideBar.Menu.Item>
                </SideBar.Menu>
                <SideBar.Content>
                    <Switch>
                        <Route path={`${match.path}/customer-creation`}>
                            <CustomerCreation />
                        </Route>
                        <Route path={`${match.path}/deposit`}>
                            <DepositCreation />
                        </Route>
                        <Route path={`${match.path}/transaction-history`}>
                            <TransactionHistory />
                        </Route>
                    </Switch>
                </SideBar.Content>
            </SideBar>
        </React.Fragment>
    );
};

export default Employee;
