const express = require('express');
const router = express.Router();

router.get("/add-product", (req, res, next) => {
    console.log("add-produc page");
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</form>');
});

router.post("/product", (req, res, next) => {
    console.log(req.body["title"]);
    res.redirect("/");
});

module.exports = router;