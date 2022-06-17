// Create server
// const { randomUUID } = require('crypto');
const express = require('express');
const path = require('path');
const errorsController = require('./controllers/errors');
const sequelize = require('./util/database');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');


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
    User.findByPk(1)
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
Product.belongsTo(User, {constraints: true, onDelete: "CASCADE"});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through: OrderItem});

// this method "sync()" will sync your models and create tables in database.
sequelize
// NOT CORRECT to use force:true in production, it will cause overwrite tables.
// .sync({force: true})
.sync()
.then(results => {
    // console.log("sequelize sync results : \n",results);
    return User.findByPk(1);
})
.then(user => {
    if(!user){
        return User.create({
            name: 'Khalid', phone_number: '0567109909'
        });
    }
    return user;
})
// .then(user => {
//     return user.createCart();
// })
.then(user => {
    app.listen(3000);
})
.catch(error => {
    console.log("sequelize sync error : \n", error);
});