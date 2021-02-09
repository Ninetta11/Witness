import { isEmpty } from 'lodash';
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING, REFRESH_DETAILS } from '../utils/types';
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
    errors: {}
};

export function appReducer(state = appInitialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
            };
        case USER_LOADING:
            return {
                ...state,
                loading: true,
            };
        case REFRESH_DETAILS:
            return {
                ...state,
                user: action.payload,
            }
        case GET_ERRORS:
            return action.payload;
        default:
            return state;
    }
}