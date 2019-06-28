const db = require("../util/database").pool;

class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute(
      `INSERT INTO product 
        (title, imageUrl, description, price)
        VALUES (?,?,?,?)`,
      [this.title, this.imageUrl, this.description, this.price]
    );
  }

  static delete(id) {}

  static async fetchAll() {
    return db.execute("SELECT * FROM product").then(result => result[0]);
  }

  static async findById(id) {}
}

module.exports = {
  Product
};
