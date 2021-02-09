import { isEmpty } from 'lodash';
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING, REFRESH_DETAILS, UPDATE_STREET_NO } from '../utils/types';
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

// const updateObject = (oldObject, updatedProperties) => (

//     console.log(oldObject, updatedProperties),
//     {
//         ...oldObject,
//         ...updatedProperties
//     }
// );


// const setStreetNo = (state, action) => updateObject(state, { street_no: action.payload });

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
        // case UPDATE_STREET_NO:
        //     return setStreetNo(state.user, action)
        // this sets street_no on the same level as user
        //return { ...state, street_no: action.payload }
        case GET_ERRORS:
            return action.payload;
        default:
            return state;
    }
}