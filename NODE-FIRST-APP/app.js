// Create server
const http = require('http');
const fs = require('fs');

const server = http.createServer(rqListener);

function rqListener(req, res){
    const url = req.url;
    const method = req.method;

    if(url === '/'){
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></input></form></body>');
        res.write('</head>');
        return res.end();
    }

    if(url === "/message" && method === "POST"){
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split("=")[1];
            console.log(message);
            fs.writeFileSync('message.text', message);
            res.statusCode = 302;
            res.setHeader("Location", "/");
            return res.end();
        });
    }
    res.write('<html>');
    res.write('<head><title>Message</title></head>');
    res.write('<body><h1>Hi Khalid</h1></body>');
    res.write('</head>');
    res.end();
    
}

server.listen(3000);