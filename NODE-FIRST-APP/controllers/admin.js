const Product = require('../models/product');
const {ObjectId} = require('mongodb');

const getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add new productsss',
    path: '/admin/add-product',
  });
};

const postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, price,description,imageUrl);
  product.save()
  .then(results => {
    res.redirect('/products');
  })
  .catch(error => {
    console.log("Error in inserting the product.");
  });
};

const getEditProduct = (req, res, next) => {
  // Check edit mode.
  const editMode = req.query.edit;
  if(!editMode){
    res.redirect('/');
  }

  // Check edit mode.
  const productId = req.params.productId;

  if(!productId){
    return res.redirect("/");
  }else{
    Product.fetchProduct(productId)
  .then(product => {
    res.render('admin/edit-product', {
      pageTitle: 'Edit productsss',
      path: '/admin/add-product',
      editing: editMode,
      productId: productId,
      product: product
    });
  })
  .catch();
  
  }
};

const postEditProduct = (req, res, next) => {
  const productID = req.body.id;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;

  Product.fetchProduct(productID)
  // this "then" is for findByPk()
  .then(productFetched => {
    const product = new Product(updatedTitle, updatedPrice, updatedDescription, updatedImageUrl, ObjectId(productID));
    product.update();
    // this method "save()" will update the data for same product in database
    return product.save();
  })
  // this "then" is for save()
  .then(result => {
    console.log(`Product (ID : ${productID}) is Updated Successfully.`);
  })
  // this "catch" is for save() & findByPk()
  .catch();
  res.redirect('/products/'+productID);

};

const deleteProduct = (req, res, next) => {
  const productID = req.body.id;
  Product.deleteProduct(productID)
  .then(result => {
    res.redirect('/admin/products');
  })
  .catch();
}

const getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(products => {
    res.render('admin/products', {
      pageTitle: 'Admin Products',
      products: products,
      path: '/admin/products',
      titleListOfProducts: 'List of products in the stores : '
    });
  })
  .catch();
};

module.exports = {
    getAddProduct: getAddProduct,
    postAddProduct: postAddProduct,
    getProducts: getProducts,
    getEditProduct: getEditProduct,
    postEditProduct: postEditProduct,
    deleteProduct: deleteProduct
}