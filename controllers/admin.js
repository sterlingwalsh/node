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
  new Product(null, title, imageUrl, description, price)
    .save()
    .then(() => res.redirect("/admin/products"));
};

const getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const { productId } = req.params;
  Product.findById(productId).then(product => {
    console.log({ product });
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product
    });
  });
};

const postEditProduct = (req, res, next) => {
  const { productId, title, imageUrl, description, price } = req.body;
  const updatedProduct = new Product(
    productId,
    title,
    imageUrl,
    description,
    price
  );
  updatedProduct.save();
  return res.redirect("/admin/products");
};

const getProducts = (req, res, next) => {
  Product.fetchAll().then(products => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products"
    });
  });
};

const postDeleteProduct = (req, res, next) => {
  const { productId } = req.body;
  // console.log({ productId });
  Product.findById(productId).then(product => {
    // console.log({ product });
    Cart.deleteProduct(productId, product.price);
    Product.delete(productId);
    return res.redirect("/admin/products");
  });
};

module.exports = {
  getProducts,
  getAddProduct,
  postAddProduct,
  getEditProduct,
  postEditProduct,
  postDeleteProduct
};
