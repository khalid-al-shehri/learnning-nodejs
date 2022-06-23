// Create server
// const { randomUUID } = require('crypto');
const express = require('express');
const path = require('path');
const errorsController = require('./controllers/errors');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const mongo = require('./util/database');
const User = require('./models/user');

const app = express();

// set ejs (package) as view engine for this application.
app.set('view engine', 'ejs');
app.set('views', 'views');



app.use(express.urlencoded({extended: false}));
// Serving Files Staticallt
app.use(express.static(path.join(__dirname, 'public')));

// This func will called every time and gives the request ID
// function addRequestId (req, _) {
//     id = randomUUID()
//     req.id = id
// }
// app.use('/', addRequestId)

// This func will called every time any API called and gives the request a user details
app.use((req, res, next) => {
    User.fetchUser("62b4169be8a193f090085be3")
    .then(user => {
        req.user = user;
        next();
    })
    .catch(error => console.log(error));

    next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// 404 Page
app.use(errorsController.get404Page);



mongo.mongoConnect(() => {
    app.listen(3000);
});