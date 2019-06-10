const fs = require('fs');

const requestHandler = (req, res) => {

    const url = req.url;
    const method = req.method;

    if(url === "/"){
        res.write("<html><head></head><body><form action='/message' method='POST'><input type='text' name='message'></input><button type='submit'>Send</button></form></body></html>");
        return res.end();
    }

    if(url === '/message' && method === 'POST'){
        console.log('message');
        const body = [];
        req.on('data', (chunk) => {
            console.log('chunk', chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            console.log('parsebody', parsedBody);
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
        

    }

    res.setHeader('Content-Type', 'text/html');
    res.write('this is html');
    res.end();

}    

module.exports = {
    requestHandler
}