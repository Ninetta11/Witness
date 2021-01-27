const db = require("../models");

// Define the methods to send and retrieve data from the database
module.exports = {

    // creating a new user
    create: function (req, res) {
        db.User
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    },

    // finding a user
    findUser: function (req, res) {
        db.User
            // I dont think this is the right path
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    },

    // updating the user 
    // password
    // address
    // occupation
    // adding a new hash to the records
    update: function (req, res) {
        db.User
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
}



