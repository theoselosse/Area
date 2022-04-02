const express = require('express');
const router = express.Router();
const User = require('../models/User');
const utils = require('../utils');

router.get('/', (req, res) => {
    res.redirect('http://localhost:8081/');
});

router.post('/', (req, res) => {
    const {email,password} = req.body;

    User.findOne({email:email}, (err, user) => {
        if (user) {
            if (password === user.password) {
                const token = utils.generateToken(user);
                const userObj = utils.getCleanUser(user);
                return res.json({ message: "Login success", user: userObj, token });
                // res.send({message:'Login sucess.', user:user})
            } else {
                res.send({message:'Wrong credentials!'})
            }
        } else {
            res.send('User not found.');
        }
    })
});

module.exports = router;
