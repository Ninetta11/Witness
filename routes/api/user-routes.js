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
            res.send({ type: 'error', message: 'There was a problem. Please try again' });
        })
})

// I dont think i need this?????
// router.get('/api/profile', (req, res) => {
//     var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
//     User.findOne({
//         _id: decoded._id
//     })
//         .then(response => {
//             if (response) {
//                 res.json(response)
//             }
//             else {
//                 res.status(400).json({ error: "User does not exist" });
//             }
//         })
//         .catch(err => {
//             res.send('error: ' + err);
//         })
// })

// router.get('/api/displayusers', (req, res) => {
//     User.find()
//         .then(response => {
//             if (response) {
//                 res.json(response)
//             }
//             else {
//                 res.status(400).json({ error: "Users do not exist" });
//             }
//         })
//         .catch(err => {
//             res.send('error: ' + err);
//         })
// })

router.post('/api/document', (req, res) => {
    User.findOneAndUpdate({
        // searches database for user with same IOTA address
        IOTA_address: req.body.IOTA_address
        // updates documents with returned hash 
    }, { $push: { documents: req.body.hash } },
        { new: true }
    ).then(response => {
        console.log(response);
        res.send({ type: 'success', message: 'Your document has been saved' });
    })
})

router.get('/user/document/:hash', (req, res) => {
    const documentHash = req.params.hash
    console.log(documentHash)
    res(documentHash)
})


module.exports = router;
