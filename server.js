const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const { sequelize } = require("./util/database");
const { Product } = require("./models/product");
const { User } = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoute = require("./routes/admin").router;
const shopRoute = require("./routes/shop").router;
const errorRoute = require("./routes/404error").router;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => {
      console.log(err);
      next();
    });
});

app.use("/admin", adminRoute);
app.use(shopRoute);

app.use(errorRoute);

Product.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE"
});

User.hasMany(Product);

sequelize
  .sync()
  .then(result => {
    return User.findByPk(1);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: "UserName", email: "user@gmail.com" });
    }
    return user;
  })
  .then(user => {
    app.listen(3000);
  })
  .catch(err => console.log);
