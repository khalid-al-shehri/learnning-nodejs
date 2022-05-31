const express = require('express');
const router = express.Router();

router.get("/", (req, res, next) => {
    res.send("Hi Welcome to home page");
});

module.exports = router;