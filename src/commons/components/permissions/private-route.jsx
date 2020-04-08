import React from 'react';
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import _ from 'lodash';

function PrivateRoute({ children, ...rest }) {
    const isAuthenticated = useSelector(state => state.login.isAuthenticated);
    return (
        <Route {...rest}>
            {isAuthenticated ? children : <Redirect to='/login' />}
        </Route>
    );
}

export default PrivateRoute;
