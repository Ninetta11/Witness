import React from 'react';
import Home from './views/Home';
import { useAppContext } from './store';

function Auth(ComposedComponent) {
    const [state] = useAppContext();

    return function Authentication(props) {
        return state.isAuthenticated
            ? <ComposedComponent {...props} />
            : <Home />;
    };
}

export default Auth;
