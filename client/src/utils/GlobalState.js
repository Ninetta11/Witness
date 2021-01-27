import React, { createContext, useReducer, useContext } from "react";

const UserContext = createContext();
const { Provider } = UserContext;

const reducer = (state, action) => {
    switch (action.type) {
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
