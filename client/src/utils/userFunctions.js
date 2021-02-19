import axios from 'axios';

export const registerUser = (userData) => {
    return axios.post('/api/register', {
        first_name: userData.first_name,
        last_name: userData.last_name,
        address: userData.address,
        occupation: userData.occupation,
        email: userData.email,
        password: userData.password,
        IOTA_address: userData.IOTA_address,
        IOTA_seed: userData.IOTA_seed,
    });
};

export const loginUser = (userData) => {
    return axios.post('/api/login', {
        email: userData.email,
        password: userData.password,
    });
};

export const getUsers = () => {
    return axios.get('/api/displayusers')
        .then((res) => res.data)
};

export const updateUserDetails = (userData) => {
    return axios.post('/api/update', {
        email: userData.email,
        name: userData.name,
        value: userData.value
    })
};

// generates random seed
export const generateSeed = () => {
    // IOTA seed must be 81 characters and can include letters and the number 9
    const options = '9ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let seed = '';
    // randomised selection
    for (let i = 0; i < 81; i++) {
        seed += options.charAt(parseInt(Math.random() * options.length))
    };
    return seed;
}