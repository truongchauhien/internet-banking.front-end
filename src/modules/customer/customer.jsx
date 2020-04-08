import React, { useState, useCallback, useEffect } from 'react';
import { NavLink, useRouteMatch, Link, Route, Switch, useLocation, matchPath } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { SideBar, MenuItem } from '../../commons/components/sidebar/sidebar';
import Accounts from './modules/accounts/accounts';
import Contacts from './modules/contacts/contacts';
import Transfer from './modules/transfer/transfer';
import styles from './customer.scss';

const _matchPath = (path1, path2) => {
    return matchPath(path1, {
        path: path2,
        exact: false,
        strict: false,
    }) !== null;
}

function MainLayout(props) {
    const { url, path } = useRouteMatch();
    const { pathname } = useLocation();

    let initActiveLink = '';
    if (_matchPath(pathname, path + '/accounts')) {
        initActiveLink = 'accounts';
    } else if (_matchPath(pathname, path + '/contacts')) {
        initActiveLink = 'contacts';
    } else if (_matchPath(pathname, path + '/transfer')) {
        initActiveLink = 'transfer';
    }
    const [activeLink, setActiveLink] = useState(initActiveLink);

    const handleMenuItemClick = useCallback((name) => {
        setActiveLink(name);
    });

    useEffect(() => {
        document.title = 'Internet Banking: Xin chào';
    }, []);

    return (
        <React.Fragment>
            <SideBar>
                <SideBar.Menu>
                    <SideBar.Menu.Item active={activeLink === 'accounts'} onClick={() => handleMenuItemClick('accounts')}>
                        <NavLink to={`${url}/accounts`}>Tài khoản</NavLink>
                    </SideBar.Menu.Item>
                    <SideBar.Menu.Item active={activeLink === 'contacts'} onClick={() => handleMenuItemClick('contacts')}>
                        <NavLink to={`${url}/contacts`}>Danh bạ</NavLink>
                    </SideBar.Menu.Item>
                    <SideBar.Menu.Item active={activeLink === 'transfer'} onClick={() => handleMenuItemClick('transfer')}>
                        <NavLink to={`${url}/transfer`}>Chuyển khoản</NavLink>
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
                        <Route path={`${path}/transfer`}>
                            <Transfer />
                        </Route>
                    </Switch>
                </SideBar.Content>
            </SideBar>
        </React.Fragment>
    )
};

export default MainLayout;
