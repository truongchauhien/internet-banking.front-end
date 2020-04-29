import React, { useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Login from './modules/authentication/login';
import PasswordReset from './modules/authentication/password-reset/password-reset';
import PrivateRoute from './commons/components/permissions/private-route';
import Customer from './modules/customer/customer';
import { thunkedLoginRestore } from './modules/authentication/thunks';
import './app.scss';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const App = (props) => {
    const dispatch = useDispatch();

    const isAuthenticated = useSelector(state => state.authentication.isAuthenticated);
    const isRestoring = useSelector(state => state.authentication.isRestoring);
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
                        <div>Employee</div>
                    </PrivateRoute>

                    <PrivateRoute path='/administrator'>
                        <div>Administrator</div>
                    </PrivateRoute>
                </Switch>
            </BrowserRouter>
            <ToastContainer />
        </React.Fragment>
    );
};

export default App;
