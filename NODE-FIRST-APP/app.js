// Create server
// const { randomUUID } = require('crypto');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const errorsController = require('./controllers/errors');


const app = express();

// set pug (package) as view engine for this application.
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// Body-parser
// app.use(bodyParser.urlencoded({extended: false}));
app.use(express.urlencoded({extended: false}));
// Serving Files Staticallt
app.use(express.static(path.join(__dirname, 'public')));

// This func will called every time and gives the request ID
// function addRequestId (req, _) {
//     id = randomUUID()
//     req.id = id
// }
// app.use('/', addRequestId)

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// 404 Page
app.use(errorsController.get404Page);

app.listen(3000);