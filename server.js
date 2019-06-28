const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const db = require("./util/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoute = require("./routes/admin").router;
const shopRoute = require("./routes/shop").router;
const errorRoute = require("./routes/404error").router;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoute);
app.use(shopRoute);

app.use(errorRoute);

app.listen(3000);
