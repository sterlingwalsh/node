const fs = require("fs");
const path = require("path");
const { processDir } = require("../util/path");

const cartFilePath = path.join(processDir, "data", "cart.json");
class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(cartFilePath, (err, cartData) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(cartData);
      }

      const existingProductIndex = cart.products.findIndex(
        product => product.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct, qty: existingProduct.qty + 1 };
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(cartFilePath, JSON.stringify(cart), err => console.log);
    });
  }

  static deleteProduct(id, price) {
    fs.readFile(cartFilePath, (err, cartData) => {
      if (err) return;
      const cart = JSON.parse(cartData);

      const existingProductIndex = cart.products.findIndex(
        product => product.id === id
      );
      if (existingProductIndex < 0) return;

      const itemToDelete = cart.products.splice(existingProductIndex, 1);
      cart.totalPrice = cart.totalPrice - +price * itemToDelete[0].qty;
      fs.writeFile(cartFilePath, JSON.stringify(cart), err => console.log);
    });
  }

  static async getProducts() {
    return await new Promise((resolve, reject) => {
      fs.readFile(cartFilePath, (err, cartData) => {
        if (err) {
          resolve([]);
        } else {
          resolve(JSON.parse(cartData));
        }
      });
    });
  }
}

module.exports = { Cart };
