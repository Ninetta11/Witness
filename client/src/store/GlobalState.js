import { isEmpty } from 'lodash';
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from '../actions/types';
import jwt_decode from 'jwt-decode';

const getToken = () => {
    const token = localStorage.getItem('userToken');
    if (token) {
        const decodedToken = jwt_decode(token);
        return decodedToken;
    }
    return {};
}

export const appInitialState = {
    isAuthenticated: false,
    user: getToken(),
    loading: false,
    alerts: {}
};

export function appReducer(state, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            console.log('appStore/reducer/setciurrentuser');
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
            };
        case USER_LOADING:
            console.log('appStore/reducer/userloading');
            return {
                ...state,
                loading: true,
            };
        case GET_ERRORS:
            console.log('appStore/reducer/geterrors');
            return action.payload;
        default:
            return state;
    }
}