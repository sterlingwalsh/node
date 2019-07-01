const { Product } = require("../models/product");
const { Cart } = require("../models/cart");

const getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false
  });
};

const postAddProduct = (req, res, next) => {
  const { title, imageUrl, description, price } = req.body;
  Product.create({
    title,
    imageUrl,
    description,
    price,
    user: req.user.id
  })
    .then(result => {
      res.redirect("/admin/add-product");
    })
    .catch(err => console.log);
};

const getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const { productId } = req.params;
  Product.findByPk(productId)
    .then(product => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product
      });
    })
    .catch(err => console.log);
};

const postEditProduct = (req, res, next) => {
  const { productId, title, imageUrl, description, price } = req.body;

  Product.findByPk(productId)
    .then(product => {
      const updatedProduct = Object.assign(product, {
        productId,
        title,
        imageUrl,
        description,
        price
      });
      return product.save();
    })
    .then(update => {
      console.log("updated");
      return res.redirect("/admin/products");
    })
    .catch(err => console.log);
};

const getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products"
      });
    })
    .catch(err => console.log);
};

const postDeleteProduct = (req, res, next) => {
  const { productId } = req.body;

  Product.findByPk(productId)
    .then(product => {
      return product.destroy();
    })
    .then(updated => {
      res.redirect("/admin/products");
    })
    .catch(err => console.log);
};

module.exports = {
  getProducts,
  getAddProduct,
  postAddProduct,
  getEditProduct,
  postEditProduct,
  postDeleteProduct
};
