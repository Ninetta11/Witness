import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAppContext } from '../store';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [state] = useAppContext();

    return (
        console.log('src/PrivateRoute.js'),
        <Route
            {...rest}
            render={(routeProps) =>
                state.isAuthenticated ? <Component {...routeProps} /> : <Redirect to="/api/login" />
            }
        />
    );
};

export default PrivateRoute;