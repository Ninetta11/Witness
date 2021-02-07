const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const cors = require('cors');
const jwt = require("jsonwebtoken");
const passport = require("passport");

// Load User model
const { User } = require("../../models");
router.use(cors())
process.env.SECRET_KEY = 'secret';

router.post('/api/register', (req, res) => {
    User.findOne({
        email: req.body.email
    })
        .then(response => {
            if (response) {
                res.status(400).json({ email: "Email already exists" });
                return res.send("Email already exists");
            }
            else {
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
                console.log(req.body);
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
                    res.status(400).send({ type: 'error', message: 'Your password is incorrect' });
                }
            }
            else {
                res.status(400).send({ type: 'error', message: 'There are no users registered under that email address. Please register now.' });
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

router.post('/api/document', (req, res) => {
    User.findOneAndUpdate({
        // searches database for user with same IOTA address
        IOTA_address: req.body.IOTA_address
        // updates hash with returned hash 
    }, { $set: { documents: req.body.hash } }
    ).then(response => {
        console.log(response);
    })
})

module.exports = router;
