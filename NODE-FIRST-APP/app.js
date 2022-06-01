// Create server
const http = require('http');
const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');

const app = express();

// set pug (package) as view engine for this application.
app.set("view engine", "ejs");
app.set("views", "views");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// Body-parser
app.use(bodyParser.urlencoded({extended: false}));
// Serving Files Staticallt
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);
app.use(shopRoutes);

// 404 Page
app.use((req, res, next) => {
    res.status(404).render("404", {pageTitle: "Page Not Found"});
});

app.listen(3000);