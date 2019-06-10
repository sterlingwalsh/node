const http = require('http');
const routes = require('./routes');

const localPort = 3000;

const server = http.createServer(routes.requestHandler);

server.listen(localPort);