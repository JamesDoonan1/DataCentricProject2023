const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home'); // Assuming you have a home.ejs file in the views directory
});

module.exports = router;