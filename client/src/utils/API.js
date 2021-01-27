import axios from "axios";

// API sending to routes
export default {
    // Gets all users
    getUsers: function () {
        return axios.get("/api/users");
    },
    // Gets the user with the given id
    getUser: function (id) {
        return axios.get("/api/users/" + id);
    },
    // Saves a user to the database
    saveUser: function (userData) {
        return axios.post("/api/user", userData);
    }
};
