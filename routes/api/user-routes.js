const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const cors = require('cors');
const jwt = require("jsonwebtoken");
const passport = require("passport");


// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const { User } = require("../../models");
router.use(cors())
process.env.SECRET_KEY = 'secret';

router.post('/api/register', (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    console.log(errors);
    console.log(isValid);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    console.log('register route');
    User.findOne({
        email: req.body.email
    })
        .then(response => {
            if (response) {
                res.status(400).json({ email: "Email already exists" });
                return res.send("Email already exists");
            }
            else {
                console.log('does it make it this far');
                const today = new Date()
                const userData = {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    password: req.body.password,
                    IOTA_address: req.body.IOTA_address,
                    IOTA_seed: req.body.IOTA_seed,
                    state: req.body.state,
                    postcode: req.body.postcode,
                    suburb: req.body.suburb,
                    street: req.body.street,
                    street_no: req.body.street_no,
                    occupation: req.body.occupation,
                    created: today
                }
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) throw err;
                    userData.password = hash;
                    console.log('just before create user');
                    User.create(userData)
                        .then(user => {
                            console.log('adds to database');
                            res.json(user);
                        })
                        .catch(err => {
                            console.log('cant connect to database');
                            console.log(err);
                        })
                })
            }
        })
})

router.post('/api/login', (req, res) => {
    console.log("login route");
    //Not sure if this bit is right - need to test!!!!
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({
        email: req.body.email
    })
        .then(response => {
            if (response) {
                if (bcrypt.compareSync(req.body.password, response.password)) {
                    const payload = {
                        _id: response._id,
                        first_name: response.first_name,
                        last_name: response.last_name,
                        email: response.email,
                        password: response.password,
                        IOTA_address: response.IOTA_address,
                        IOTA_seed: response.IOTA_seed,
                        state: response.state,
                        postcode: response.postcode,
                        suburb: response.suburb,
                        street: response.street,
                        street_no: response.street_no,
                        occupation: response.occupation,
                    }
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        // 1 year in seconds
                        expiresIn: 31556926
                    })
                    res.send(token)
                }
                else {
                    res.status(400).json({ error: "User does not exist" });
                }
            }
            else {
                res.status(400).json({ error: "User does not exist" });
            }
        })
        .catch(err => {
            res.send('error: ' + err);
        })
})

router.get('/api/profile', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
    User.findOne({
        _id: decoded._id
    })
        .then(response => {
            if (response) {
                res.json(response)
            }
            else {
                res.status(400).json({ error: "User does not exist" });
            }
        })
        .catch(err => {
            res.send('error: ' + err);
        })
})

router.get('/api/displayusers', (req, res) => {
    User.find()
        .then(response => {
            if (response) {
                res.json(response)
            }
            else {
                res.status(400).json({ error: "Users do not exist" });
            }
        })
        .catch(err => {
            res.send('error: ' + err);
        })
})

module.exports = router;
