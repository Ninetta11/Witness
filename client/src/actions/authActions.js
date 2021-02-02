import axios from 'axios';

// Register User
export const registerUser = (userData, history) => {
    console.log('src/actions/authactions/registeruser');
    axios.post('/api/users/register', userData).then((res) => history.push('/login'));
};

// Login - get user token
export const loginUser = (userData) => {
    console.log('src/actions/authactions/loginuser');
    return axios.post('/api/users/login', userData);
};