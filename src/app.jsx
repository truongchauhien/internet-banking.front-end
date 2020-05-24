import React, { useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { thunkedLoginRestore } from './modules/authentication/login-restoration/thunks';
import Login from './modules/authentication/login/login';
import PrivateRoute from './commons/components/permissions/private-route';
import Customer from './modules/customer/customer';
import Employee from './modules/employee/employee';
import Administrator from './modules/administrator/administrator';
import './app.scss';
import 'react-datepicker/dist/react-datepicker.css';

const App = (props) => {
    const dispatch = useDispatch();

    const isAuthenticated = useSelector(state => state.authentication.isAuthenticated);
    const isRestoring = useSelector(state => state.authentication.loginRestoration.isRestoring);
    const { userType } = useSelector(state => state.authentication.userData);
    const switchModule = useCallback(() => {
        if (isRestoring) {
            return null;
        }

        if (!isAuthenticated) {
            return <Redirect to='/login' />;
        }

        switch (userType) {
            case 'customer':
                return <Redirect to='/customer' />;
            case 'employee':
                return <Redirect to='/employee' />;
            case 'administrator':
                return <Redirect to='/administrator' />;
            default:
                return null;
        }
    }, [isRestoring, isAuthenticated, userType]);

    useEffect(() => {
        dispatch(thunkedLoginRestore());
    }, []);

    return (
        <React.Fragment>
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
                        <Employee />
                    </PrivateRoute>

                    <PrivateRoute path='/administrator'>
                        <Administrator />
                    </PrivateRoute>
                </Switch>
            </BrowserRouter>
        </React.Fragment>
    );
};

export default App;
