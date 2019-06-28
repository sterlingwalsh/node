const http = require("http");

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const { processDir } = require("./util/path");

const adminRoutes = require("./routes/admin").router;
const shopRoutes = require("./routes/shop").router;
const error404 = require("./routes/404error").router;

const localPort = 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(processDir, "public")));

// app.use((req, res, next) => {
//   console.log(req);
//   next();
// });

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(error404);

app.listen(localPort);
