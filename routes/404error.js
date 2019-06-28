const express = require("express");
const path = require("path");

const { processDir } = require("../util/path");

const router = express.Router();

router.use((req, res, next) => {
  res.status(404).render("404", {
    pageTitle: "Error",
    path: "/404"
  });
});

module.exports = { router };
