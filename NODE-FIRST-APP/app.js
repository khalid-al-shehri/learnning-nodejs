// Create server
const http = require('http');

const express = require('express');
const app = express();
const bodyParser = require("body-parser");

// next is function to go NEXT app use (Next Middleware).

// Body-parser
app.use(bodyParser.urlencoded({extended: false}));

app.use("/add-product", (req, res, next) => {
    console.log("add-produc page");
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</form>');
});

app.use("/product", (req, res, next) => {
    console.log(req.body["title"]);
    res.redirect("/");
});

app.use("/", (req, res, next) => {
    console.log("home page");
    res.send("Hi Welcome to home page");
});

const server = http.createServer(app);
server.listen(3000);