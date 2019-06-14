const express = require('express');

const router = express.Router();

<<<<<<< HEAD
router.get('/', (req, res, next) => {
=======
router.use('/', (req, res, next) => {
>>>>>>> 47ba3e39211d9208dc2418f4df1a8ab579126af3
    res.send('<h1>front page</h1>');
});

module.exports = {router}