const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin').router;
const shopRoutes = require('./routes/shop').router;

const localPort = 3000;

const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.use(adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).send('<h1>Page not found</h1>');
});

app.listen(localPort);