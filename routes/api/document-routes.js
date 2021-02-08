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