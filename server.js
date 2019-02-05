const http = require('http');

const server = http.createServer((request, response) => {
    const user = {
        name: 'John',
        hobby: 'Skating'
    }
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(user));
});

server.listen(3000);