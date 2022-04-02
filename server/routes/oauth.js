const express = require('express');
const router = express.Router();
const axios = require("axios");

// Github's App Credentials
// https://github.com/settings/applications/new
// Homepage = http://localhost:8080
// Callback = http://localhost:8080/oauth/redirect

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

// oauth/redirect
router.get("/redirect", (req, res) => {
    axios({
            method: "POST",
            url: "https://github.com/login/oauth/access_token?client_id=" + GITHUB_CLIENT_ID + "&client_secret=" + GITHUB_CLIENT_SECRET + "&code=" + req.query.code,
            headers: {
                Accept: "application/json",
            },
        }).then((response) => {
            res.redirect(
                "http://localhost:8081/login?access_token=" + response.data.access_token
            );
        });
    }
);

module.exports = router
