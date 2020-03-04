import React from 'react';
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import _ from 'lodash';

function PrivateRoute({ component, ...rest }) {
    const isAuthenticated = useSelector(state => state.login.isAuthenticated);

    return (
        <Route {...rest} render={() => {
            if (isAuthenticated) {
                return component;
            }
            return <Redirect to='/login' />;
        }}
        />
    );
}

export default PrivateRoute;
