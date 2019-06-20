const path = require("path");

const express = require("express");

const { processDir } = require("../utils/path");
const adminData = require("./admin");

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log(adminData.products);
  res.sendFile(path.join(processDir, "./views/shop.html"));
});

module.exports = { router };
