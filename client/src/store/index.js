import React, { createContext, useContext, useReducer } from 'react';
import { appReducer, appInitialState } from './GlobalState';

const UserContext = createContext([
    appInitialState,
    function dispatch() { },
]);

const { Provider } = UserContext;

export const StoreProvider = ({ children, ...props }) => {
    const [appState, appDispatch] = useReducer(appReducer, appInitialState);

    return (
        <Provider
            value={[appState, appDispatch]}
            {...props}
        >
            {children}
        </Provider>
    );
};

export const useAppContext = () => useContext(UserContext);