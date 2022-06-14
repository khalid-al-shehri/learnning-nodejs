const productModel = require('../models/product');

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

  const product = new productModel(title, imageUrl, description, price, null);
  product.save();
  res.redirect('/');
};

const getEditProduct = (req, res, next) => {
  // Check edit mode.
  const editMode = req.query.edit;
  if(!editMode){
    res.redirect('/');
  }

  // Check edit mode.
  const productId = req.params.productId;

  productModel.fetchProdcut(productId, product => {
    if(!product){
      return res.redirect("/");
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit productsss',
      path: '/admin/add-product',
      editing: editMode,
      productId: productId,
      product: product
    });
  });
};

const postEditProduct = (req, res, next) => {
  const id = req.body.id;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new productModel(title, imageUrl, description, price, id);
  product.update();
  res.redirect('/products/'+id);

};

const deleteProduct = (req, res, next) => {
  const id = req.body.id;
  productModel.delete(id);
  res.redirect('/admin/products');
}

const getProducts = (req, res, next) => {
  productModel.fetchAll((productsFromFile) => {
    res.render('admin/products', {
      pageTitle: 'Admin Products',
      products: productsFromFile,
      path: '/admin/products',
      titleListOfProducts: 'List of products in the stores : '
    });
  });
};

module.exports = {
    getAddProduct: getAddProduct,
    postAddProduct: postAddProduct,
    getProducts: getProducts,
    getEditProduct: getEditProduct,
    postEditProduct: postEditProduct,
    deleteProduct: deleteProduct
}