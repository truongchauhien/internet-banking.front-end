import React, { useEffect } from 'react';
import { NavLink, useRouteMatch, Route, Switch } from 'react-router-dom';
import SideBar from '../../commons/components/sidebar/sidebar';
import Accounts from './accounts/accounts';
import Contacts from './contacts/contacts';
import Transfers from './transfers/transfers';
import Debts from './debts/debts';
import TransactionHistory from './transaction-history/transaction-history';
import TopNavigation from './top-navigation/top-navigation';
import Profile from './profile/profile';
import { thunkedFetchBanks } from '../commons/modules/banks/thunks';
import styles from './customer.scss';
import { useDispatch, useSelector } from 'react-redux';
import { thunkedFetchAccounts } from './accounts/thunks';
import { thunkedFetchCustomer } from './thunks';

export function Customer(props) {
    const dispatch = useDispatch();
    const customerId = useSelector(state => state.authentication.userData.userId);

    useEffect(() => {
        document.title = 'Internet Banking: Xin chào';
        (async () => {
            await dispatch(thunkedFetchBanks());
            await dispatch(thunkedFetchAccounts({
                customerId
            }));
            await dispatch(thunkedFetchCustomer({
                customerId
            }));
        })();
    }, []);

    const match = useRouteMatch();

    return (
        <React.Fragment>
            <TopNavigation />
            <Switch>
                {/* Nested routes always on top. */}
                <Route path={`${match.path}/profile`}>
                    <Profile />
                </Route>
                <Route path={`${match.path}`}>
                    <SideBar>
                        <SideBar.Menu>
                            <SideBar.Menu.Item>
                                <NavLink to={`${match.url}/accounts`} activeClassName={styles.activeSidebarMenuItem}>Tài khoản ngân hàng</NavLink>
                            </SideBar.Menu.Item>
                            <SideBar.Menu.Item>
                                <NavLink to={`${match.url}/contacts`} activeClassName={styles.activeSidebarMenuItem}>Danh bạ</NavLink>
                            </SideBar.Menu.Item>
                            <SideBar.Menu.Item>
                                <NavLink to={`${match.url}/transfers`} activeClassName={styles.activeSidebarMenuItem}>Chuyển khoản</NavLink>
                            </SideBar.Menu.Item>
                            <SideBar.Menu.Item>
                                <NavLink to={`${match.url}/debts`} activeClassName={styles.activeSidebarMenuItem}>Nhắc nợ</NavLink>
                            </SideBar.Menu.Item>
                            <SideBar.Menu.Item>
                                <NavLink to={`${match.url}/transaction-history`} activeClassName={styles.activeSidebarMenuItem}>Lịch sử giao dịch</NavLink>
                            </SideBar.Menu.Item>
                        </SideBar.Menu>

                        <SideBar.Content>
                            <Switch>
                                <Route path={`${match.path}/accounts`} >
                                    <Accounts />
                                </Route>
                                <Route path={`${match.path}/contacts`}>
                                    <Contacts />
                                </Route>
                                <Route path={`${match.path}/transfers`}>
                                    <Transfers />
                                </Route>
                                <Route path={`${match.path}/debts`}>
                                    <Debts />
                                </Route>
                                <Route path={`${match.path}/transaction-history`}>
                                    <TransactionHistory />
                                </Route>
                            </Switch>
                        </SideBar.Content>
                    </SideBar>
                </Route>
            </Switch>
        </React.Fragment>
    );
};

export default Customer;
