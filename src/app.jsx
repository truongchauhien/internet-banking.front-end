import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect, useLocation } from 'react-router-dom';
import Login from './modules/login/login';
import PrivateRoute from './commons/permissions/private-route';
import { useSelector } from 'react-redux';

function App(props) {
    const userType = useSelector(state => state.login.userType);

    return (
        <BrowserRouter>
            {/* */}
            <Route exact path='/'
                render={() => {
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
                }}
            />

            <Route path='/login' component={Login} />

            <PrivateRoute path='/customer' component={<div>Customer</div>} />
            <PrivateRoute path='/employee' component={<div>Employee</div>} />
            <PrivateRoute path='/administrator' component={<div>Administrator</div>} />
        </BrowserRouter>
    )
}

export default App;
