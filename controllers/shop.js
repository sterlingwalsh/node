const { Product } = require("../models/product");
const { Cart } = require("../models/cart");

const getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "Shop",
        path: "/products"
      });
    })
    .catch(err => console.log);
};

const getProduct = (req, res, next) => {
  const id = req.params.productId;
  Product.findByPk(id).then(product => {
    res.render("shop/product-detail", {
      product,
      pageTitle: product.title,
      path: "/products"
    });
  });
};

const getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/"
      });
    })
    .catch(err => console.log);
};

const getCart = (req, res, next) => {
  Cart.getProducts().then(cart => {
    Product.fetchAll()
      .then(products => {
        const cartProducts = [];
        for (product of products) {
          const cartItem = cart.products.find(p => product.id === p.id);
          if (cartItem) {
            cartProducts.push({ product, qty: cartItem.qty });
          }
        }
        return cartProducts;
      })
      .then(cartProducts => {
        console.log({ cartProducts });
        res.render("shop/cart", {
          path: "/cart",
          pageTitle: "Your Cart",
          products: cartProducts
        });
      });
  });
};

const postCart = (req, res, next) => {
  const { productId } = req.body;
  Product.findById(productId).then(product => {
    Cart.addProduct(product.id, product.price);
    res.redirect("/cart");
  });
};

const postCartDeleteItem = (req, res, next) => {
  const { productId } = req.body;
  console.log({ productId });
  Product.findById(productId).then(product => {
    Cart.deleteProduct(product.id, product.price);
    res.redirect("/cart");
  });
};

const getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders"
  });
};

const getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout"
  });
};

module.exports = {
  getProducts,
  getProduct,
  getIndex,
  getCart,
  postCart,
  postCartDeleteItem,
  getCheckout,
  getOrders
};
