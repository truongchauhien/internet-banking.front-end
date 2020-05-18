import React from 'react';
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import _ from 'lodash';

function PrivateRoute({ children, ...rest }) {
    const isAuthenticated = useSelector(state => state.authentication.isAuthenticated);
    const isRestoring = useSelector(state => state.authentication.loginRestoration.isRestoring);
    return (
        <Route {...rest}>
            {isRestoring ? null :
                isAuthenticated ? children : <Redirect to='/login' />}
        </Route>
    );
}

export default PrivateRoute;
