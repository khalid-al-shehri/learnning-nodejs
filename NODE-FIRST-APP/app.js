// Create server
const http = require('http');
const express = require('express');
const bodyParser = require("body-parser");

const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// Body-parser
app.use(bodyParser.urlencoded({extended: false}));

app.use(adminRoutes);
app.use(shopRoutes);

// 404 Page
app.use((req, res, next)=>{
    res.status(404).send("<h1>PAGE NOT FOUND, ERROR 404</h1>")
});

app.listen(3000);