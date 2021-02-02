import React, { createContext, useReducer, useContext } from "react";
import { isEmpty } from 'lodash';
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from '../actions/types';
import jwt_decode from 'jwt-decode';

const UserContext = createContext();
const { Provider } = UserContext;

const reducer = (state, action) => {
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
        case "SHOW DETAILS":
            return {
                ...state,
                currentUser: action.post,
            };

        default:
            return state;
    }
};


const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useReducer(reducer, {
        // set the state in here - will need to load current user here
        currentUser: {
            _id: "",
            first_name: "Nina",
            last_name: "Welsh",
            state: "VIC",
            postcode: "3931",
            suburb: "Mornington",
            street: "Raysun Crt",
            street_no: "1",
            occupation: "Programmer",
            email: "ninawelsh1@utlook.com",
            password: "",
            generated_IOTA_address: "",
        },
        currentUserDocuments: [
            {
                hash: "w3rq3svgdr5b657n",
                declarant: "",
                requestor: ""
            },
            {
                hash: "aetwrby6mi9p,mnbvrc",
                declarant: "",
                requestor: ""
            }
        ]
    });

    return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
    return useContext(UserContext);
};

export { StoreProvider, useStoreContext };
