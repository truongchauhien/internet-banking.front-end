import React, { useCallback, useState, useEffect } from 'react';
import { useHistory, Switch, Route, useRouteMatch, useLocation } from "react-router-dom";
import SideBar from "../../../commons/components/sidebar/sidebar";
import PasswordChange from './password-change/password-change';
import { isMatch } from '../../../commons/utils/react-router-utils';

function chooseActiveLink(currentPath, currentMatchPath) {
    if (isMatch(currentPath, currentMatchPath + '/change-password')) {
        return 'change-password';
    } else {
        return '';
    }
};

export const Profile = (props) => {
    const match = useRouteMatch();
    const currentLocation = useLocation();
    const reactRouterHistory = useHistory();

    const [activeLink, setActiveLink] = useState(chooseActiveLink(currentLocation.pathname, match.path));

    useEffect(() => {
        setActiveLink(chooseActiveLink(currentLocation.pathname, match.path));
    }, [match]);

    const handleChangePassordItemClick = useCallback(() => {
        reactRouterHistory.push(`${match.url}/change-password`);
    }, [match]);

    return (
        <SideBar>
            <SideBar.Menu>
                <SideBar.Menu.Item active={activeLink === 'change-password'} onClick={handleChangePassordItemClick}>
                    Đổi mật khẩu
                </SideBar.Menu.Item>
            </SideBar.Menu>
            <SideBar.Content>
                <Switch>
                    <Route path={`${match.path}/change-password`}>
                        <PasswordChange />
                    </Route>
                    <Route>
                        <h1>Hồ sơ cá nhân</h1>
                    </Route>
                </Switch>
            </SideBar.Content>
        </SideBar>
    );
};

export default Profile;
