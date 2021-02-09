import axios from 'axios';

export const registerUser = (userData) => {
    return axios.post('/api/register', {
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        password: userData.password,
        IOTA_address: userData.IOTA_address,
        IOTA_seed: userData.IOTA_seed,
        state: userData.state,
        postcode: userData.postcode,
        suburb: userData.suburb,
        street: userData.street,
        street_no: userData.street_no,
        occupation: userData.occupation,
    });
};

export const loginUser = (userData) => {
    return axios.post('/api/login', {
        email: userData.email,
        password: userData.password,
    });
};

export const getUsers = () => {
    return axios.get('/api/displayusers').then((res) => res.data);
};

export const updateUserDetails = (userData) => {
    return axios.post('/api/update', {
        email: userData.email,
        name: userData.name,
        value: userData.value
    })
};
