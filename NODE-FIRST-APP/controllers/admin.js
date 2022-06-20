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
  const product = new productModel(title, price,description,imageUrl);
  product.save()
  .then(results => {
    res.redirect('/products');
  })
  .catch(error => {
    console.log("Error in inserting the product.");
  });
};

// const getEditProduct = (req, res, next) => {
//   // Check edit mode.
//   const editMode = req.query.edit;
//   if(!editMode){
//     res.redirect('/');
//   }

//   // Check edit mode.
//   const productId = req.params.productId;

//   if(!productId){
//     return res.redirect("/");
//   }else{
//     req.user.getProducts({where: {id : productId}})
//     // productModel.findByPk(productId)
//   .then(products => {
//     const product = products[0];
//     res.render('admin/edit-product', {
//       pageTitle: 'Edit productsss',
//       path: '/admin/add-product',
//       editing: editMode,
//       productId: productId,
//       product: product
//     });
//   })
//   .catch();
  
//   }
// };

// const postEditProduct = (req, res, next) => {
//   const productID = req.body.id;
//   const updatedTitle = req.body.title;
//   const updatedImageUrl = req.body.imageUrl;
//   const updatedPrice = req.body.price;
//   const updatedDescription = req.body.description;

//   productModel.findByPk(productID)
//   // this "then" is for findByPk()
//   .then(product => {
//     product.title = updatedTitle;
//     product.imageUrl = updatedImageUrl;
//     product.price = updatedPrice;
//     product.description = updatedDescription;
//     // this method "save()" will update the data for same product in database
//     return product.save();
//   })
//   // this "then" is for save()
//   .then(result => {
//     console.log(`Product (ID : ${productID}) is Updated Successfully.`);
//   })
//   // this "catch" is for save() & findByPk()
//   .catch();
//   res.redirect('/products/'+productID);

// };

// const deleteProduct = (req, res, next) => {
//   const productID = req.body.id;
//   productModel.findByPk(productID)
//   req.user.getProducts({where:{id: productID}})
//   .then(products => {
//     const product = products[0];
//     return product.destroy();
//   })
//   .then(result => {
//     console.log(`Product (ID: ${productID}) has been deleted successfully.`);
//     res.redirect('/admin/products');
//   })
//   .catch();
// }

// const getProducts = (req, res, next) => {
//   req.user.getProducts()
//   // productModel.findAll()
//   .then(products => {
//     res.render('admin/products', {
//       pageTitle: 'Admin Products',
//       products: products,
//       path: '/admin/products',
//       titleListOfProducts: 'List of products in the stores : '
//     });
//   })
//   .catch();
// };

module.exports = {
    getAddProduct: getAddProduct,
    postAddProduct: postAddProduct,
    // getProducts: getProducts,
    // getEditProduct: getEditProduct,
    // postEditProduct: postEditProduct,
    // deleteProduct: deleteProduct
}