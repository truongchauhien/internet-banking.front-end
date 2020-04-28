import React, { useState, useCallback, useEffect } from 'react';
import { NavLink, useRouteMatch, Link, Route, Switch, useLocation, matchPath } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { SideBar, MenuItem } from '../../commons/components/sidebar/sidebar';
import Accounts from './accounts/accounts';
import Contacts from './contacts/contacts';
import Transfers from './transfers/transfers';
import Debts from './debts/debts';
import TopNavigation from './top-navigation/top-navigation';
import Profile from './profile/profile';
import styles from './customer.scss';

function CustomerSideBar(props) {
    const match = useRouteMatch();

    return (
        <SideBar>
            <SideBar.Menu>
                <SideBar.Menu.Item>
                    <NavLink to={`${match.url}/accounts`} activeClassName={styles.activeSidebarMenuItem}>Tài khoản ngân hàng</NavLink>
                </SideBar.Menu.Item>
                <SideBar.Menu.Item>
                    <NavLink to={`${match.url}/contacts` } activeClassName={styles.activeSidebarMenuItem}>Danh bạ</NavLink>
                </SideBar.Menu.Item>
                <SideBar.Menu.Item>
                    <NavLink to={`${match.url}/transfers`} activeClassName={styles.activeSidebarMenuItem}>Chuyển khoản</NavLink>
                </SideBar.Menu.Item>
                <SideBar.Menu.Item>
                    <NavLink to={`${match.url}/debts`} activeClassName={styles.activeSidebarMenuItem}>Nhắc nợ</NavLink>
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
                </Switch>
            </SideBar.Content>
        </SideBar>
    );
};

function CustomerUI(props) {
    const match = useRouteMatch();

    useEffect(() => {
        document.title = 'Internet Banking: Xin chào';
    }, []);

    return (
        <React.Fragment>
            <TopNavigation />
            <Switch>
                <Route path={`${match.path}/profile`}>
                    <Profile />
                </Route>
                <Route>
                    <CustomerSideBar />
                </Route>
            </Switch>
        </React.Fragment>
    );
};

export default CustomerUI;
