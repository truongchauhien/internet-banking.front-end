import React from 'react';
import { Switch, Route, useRouteMatch, useLocation, NavLink } from "react-router-dom";
import SideBar from "../../../commons/components/sidebar/sidebar";
import PasswordChange from './password-change/password-change';
import styles from './profile.scss';

export const Profile = (props) => {
    const match = useRouteMatch();

    return (
        <SideBar>
            <SideBar.Menu>
                <SideBar.Menu.Item>
                    <NavLink to={`${match.url}/password-change`} activeClassName={styles.activeSidebarMenuItem}>Đổi mật khẩu</NavLink>
                </SideBar.Menu.Item>
            </SideBar.Menu>
            <SideBar.Content>
                <Switch>
                    <Route path={`${match.path}/password-change`}>
                        <PasswordChange />
                    </Route>
                </Switch>
            </SideBar.Content>
        </SideBar>
    );
};

export default Profile;
