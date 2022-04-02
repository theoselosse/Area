const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('http://localhost:8081/');
});

module.exports = router;
