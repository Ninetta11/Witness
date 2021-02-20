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
                res.status(400).send({ type: 'error', message: 'This user already exists' });
            }
            else {
                const today = new Date()
                const userData = {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    address: req.body.address,
                    occupation: req.body.occupation,
                    email: req.body.email,
                    password: req.body.password,
                    IOTA_address: req.body.IOTA_address,
                    IOTA_seed: req.body.IOTA_seed,
                    created: today
                }
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) throw err;
                    userData.password = hash;
                    User.create(userData)
                        .then(user => {
                            res.status(200).send({ type: 'success', message: 'Your registration was successful' });
                        })
                        .catch(err => {
                            res.status(400).send({ type: 'error', message: 'There is an issue saving your information with the database. Please check your details and resubmit' });
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
                        address: response.address,
                        occupation: response.occupation,
                        email: response.email,
                        password: response.password,
                        IOTA_address: response.IOTA_address,
                        IOTA_seed: response.IOTA_seed,
                        documents: response.documents
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
            console.log(err);
            res.status(400).send({ type: 'error', message: 'There was a problem. Please try again' });
        })
})

router.get('/api/displayusers', (req, res) => {
    User.find()
        .then(response => {
            if (response) {
                res.json(response)
            }
            else {
                res.status(400).send({ type: 'error', message: "Users do not exist" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).send({ type: 'error', message: 'There was a problem. Please try again' });
        });
})

router.post('/api/update', (req, res) => {
    let value = '';
    if (req.body.name === 'password') {
        bcrypt.hash(req.body.value, 10, (err, hash) => {
            if (err) throw err;
            value = hash;
            User.findOneAndUpdate({
                // searches database for user with same email
                email: req.body.email
                // updates documents with returned hash 
            }, { $set: { [req.body.name]: value } },
                { new: true }
            )
                .then(response => {
                    res.send({ type: 'success', message: 'Your details have been updated', details: response });
                })
                .catch(err => {
                    console.log(err);
                    res.send({ type: 'error', message: 'There was a problem. Please try again' });
                })
        })
    }
    else {
        User.findOneAndUpdate({
            // searches database for user with same email
            email: req.body.email
            // updates documents with returned hash 
        }, { $set: { [req.body.name]: req.body.value } },
            { new: true }
        )
            .then(response => {
                res.send({ type: 'success', message: 'Your details have been updated', details: response });
            })
            .catch(err => {
                console.log(err);
                res.send({ type: 'error', message: 'There was a problem. Please try again' });
            })
    }
})

router.post('/api/document', (req, res) => {
    User.findOneAndUpdate({
        // searches database for user with same IOTA address
        IOTA_address: req.body.IOTA_address
        // updates documents with returned hash 
    }, { $push: { documents: { hash: req.body.hash, title: req.body.title } } },
        { new: true }
    )
        .then(response => {
            res.status(200).send({ type: 'success', message: 'Your statutory declaration has been submitted and saved', details: response });
        })
        .catch(err => {
            console.log(err);
            res.status(400).send({ type: 'error', message: 'There was a problem. Please try again' });
        })
})

module.exports = router;
