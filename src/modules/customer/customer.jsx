import React, { useState, useCallback, useEffect } from 'react';
import { NavLink, useRouteMatch, Link, Route, Switch, useLocation, matchPath } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { SideBar, MenuItem } from '../../commons/components/sidebar/sidebar';
import Accounts from './accounts/accounts';
import Contacts from './contacts/contacts';
import Transfers from './transfers/transfers';
import Debts from './debts/debts';
import styles from './customer.scss';
import { TopNavigation } from './top-navigation/top-navigation';

const checkMatch = (path1, path2) => {
    return matchPath(path1, {
        path: path2,
        exact: false,
        strict: false,
    }) !== null;
}

function initActiveLink(pathname, path) {
    if (checkMatch(pathname, path + '/accounts')) {
        return 'accounts';
    } else if (checkMatch(pathname, path + '/contacts')) {
        return 'contacts';
    } else if (checkMatch(pathname, path + '/transfers')) {
        return 'transfers';
    } else if (checkMatch(pathname, path + '/debts')) {
        return 'debts';
    } else {
        return ''
    }
};

function CustomerSideBar(props) {
    const { url, path } = useRouteMatch();
    const { pathname } = useLocation();

    const [activeLink, setActiveLink] = useState(initActiveLink(pathname, path));

    const handleMenuItemClick = useCallback((name) => {
        setActiveLink(name);
    });

    return (
        <SideBar>
            <SideBar.Menu>
                <SideBar.Menu.Item active={activeLink === 'accounts'} onClick={() => handleMenuItemClick('accounts')}>
                    <NavLink to={`${url}/accounts`}>Tài khoản ngân hàng</NavLink>
                </SideBar.Menu.Item>
                <SideBar.Menu.Item active={activeLink === 'contacts'} onClick={() => handleMenuItemClick('contacts')}>
                    <NavLink to={`${url}/contacts`}>Danh bạ</NavLink>
                </SideBar.Menu.Item>
                <SideBar.Menu.Item active={activeLink === 'transfers'} onClick={() => handleMenuItemClick('transfers')}>
                    <NavLink to={`${url}/transfers`}>Chuyển khoản</NavLink>
                </SideBar.Menu.Item>
                <SideBar.Menu.Item active={activeLink === 'debts'} onClick={() => handleMenuItemClick('debts')}>
                    <NavLink to={`${url}/debts`}>Nhắc nợ</NavLink>
                </SideBar.Menu.Item>
            </SideBar.Menu>

            <SideBar.Content>
                <Switch>
                    <Route path={`${path}/accounts`} >
                        <Accounts />
                    </Route>
                    <Route path={`${path}/contacts`}>
                        <Contacts />
                    </Route>
                    <Route path={`${path}/transfers`}>
                        <Transfers />
                    </Route>
                    <Route path={`${path}/debts`}>
                        <Debts />
                    </Route>
                </Switch>
            </SideBar.Content>
        </SideBar>
    );
};

function CustomerProfile(props) {
    return (
        <div></div>
    );
}

function CustomerUI(props) {
    const { url, path } = useRouteMatch();

    useEffect(() => {
        document.title = 'Internet Banking: Xin chào';
    }, []);

    return (
        <React.Fragment>
            <TopNavigation />
            <Switch>
                <Route path={`${path}/profile`}>
                    <CustomerProfile />
                </Route>
                <Route>
                    <CustomerSideBar />
                </Route>
            </Switch>
        </React.Fragment>
    );
};

export default CustomerUI;
