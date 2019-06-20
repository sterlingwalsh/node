const express = require("express");
const path = require("path");

const { processDir } = require("../utils/path");

const router = express.Router();

router.use((req, res, next) => {
  console.log(404);
  res.status(404).sendFile(path.join(processDir, "views", "404.html"));
});

module.exports = { router };
