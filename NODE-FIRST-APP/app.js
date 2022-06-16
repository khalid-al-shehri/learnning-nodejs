// Create server
// const { randomUUID } = require('crypto');
const express = require('express');
const path = require('path');
const errorsController = require('./controllers/errors');
const sequelize = require('./util/database');
const productModel = require('./models/product');
const userModel = require('./models/user');
const cartModel = require('./models/cart');
const cartItemModel = require('./models/cart-item');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const CartItem = require('./models/cart-item');

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
    userModel.findByPk(1)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(error => {
        console.log(error);
    });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// 404 Page
app.use(errorsController.get404Page);

// Associations
productModel.belongsTo(userModel, {constrants: true, onDelete: "CASCADE"});
userModel.hasMany(productModel);
userModel.hasOne(cartModel);
cartModel.belongsTo(userModel);
cartModel.belongsToMany(productModel, {through: CartItem});
productModel.belongsToMany(cartModel, {through: CartItem});

// this method "sync()" will sync your models and create tables in database.
sequelize
// NOT CORRECT to use force:true in production, it will cause overwrite tables.
// .sync({force: true})
.sync()
.then(results => {
    // console.log("sequelize sync results : \n",results);
    return userModel.findByPk(1);
})
.then(user => {
    if(!user){
        return userModel.create({
            name: 'Khalid', phone_number: '0567109909'
        });
    }
    return user;
})
.then(user => {
    app.listen(3000); 
})
.catch(error => {
    console.log("sequelize sync error : \n", error);
});