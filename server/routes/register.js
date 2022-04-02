const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
    res.redirect('http://localhost:8081/');
});

router.post('/', (req,res) => {
    // console.log(req.body);
    const {username, email, password} = req.body;
    console.log(username + " " + email + " " + password);
    User.findOne({email:email}, (err,user) => {
        if (user) {
            res.send({message:"user already exist"});
        } else {
            const user = new User({username, email, password});
            user.save(err => {
                if (err) {
                    res.send(err);
                } else {
                    res.send({message:"success"});
                }
            })
        }
    })
});

module.exports = router;
