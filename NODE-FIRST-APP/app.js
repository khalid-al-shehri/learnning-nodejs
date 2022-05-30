// Create server
const http = require('http');

const express = require('express');
const app = express();

// next is function to go NEXT app use (Next Middleware).
app.use((req, res, next) => {
    console.log("Middleware 1");
    next();
});

app.use((req, res, next) => {
    console.log("Middleware 2");
    res.send("Hi Welcome");
});

const server = http.createServer(app);
server.listen(3000);