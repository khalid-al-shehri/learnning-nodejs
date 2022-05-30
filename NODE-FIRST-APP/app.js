// Create server
const http = require('http');

const express = require('express');
const app = express();

app.use("/", (req, res, next) => {
    console.log("This print always runs!");
    next();
});

// next is function to go NEXT app use (Next Middleware).
app.use("/add-product", (req, res, next) => {
    console.log("add-produc page");
    res.send("Hi Welcome to add-product page");
});

app.use("/", (req, res, next) => {
    console.log("home page");
    res.send("Hi Welcome to home page");
});

const server = http.createServer(app);
server.listen(3000);