import React, { useCallback } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './modules/login/login';
import PrivateRoute from './commons/components/permissions/private-route';
import Customer from './modules/customer/customer';
import './app.scss';

const App = (props) => {
    const userType = useSelector(state => state.login.userType);
    const switchModule = useCallback(() => {
        switch (userType) {
            case 'customer':
                return <Redirect to='/customer' />;
            case 'employee':
                return <Redirect to='/employee' />;
            case 'administrator':
                return <Redirect to='/administrator' />;
            default:
                return <Redirect to='/customer' />;
        }
    });

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/'>
                    {switchModule()}
                </Route>

                <Route path='/login'>
                    <Login />
                </Route>

                <PrivateRoute path='/customer'>
                    <Customer />
                </PrivateRoute>

                <PrivateRoute path='/employee'>
                    <div>Employee</div>
                </PrivateRoute>

                <PrivateRoute path='/administrator'>
                    <div>Administrator</div>
                </PrivateRoute>
            </Switch>
        </BrowserRouter>
    );
};

export default App;
