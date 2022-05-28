const fs = require("fs");

const requestHandler = (req, res) => {
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
            // print the message 
            console.log(message);
            fs.writeFile('message.text', message, error => {
                res.statusCode = 302;
                res.setHeader("Location", "/");
                return res.end();
            });
        });
    }
    res.write('<html>');
    res.write('<head><title>Message</title></head>');
    res.write('<body><h1>Hi Khalid</h1></body>');
    res.write('</head>');
    res.end();
}

// First way to export (CORRECT)
// module.exports = {
//     handler: requestHandler,
//     someText: "Khalid"
// };

// Second way to export (CORRECT)
// module.exports.handler = requestHandler;
// module.exports.someText = "Khalid";

// Only for node.js way to export (CORRECT)
exports.handler = requestHandler;
exports.someText = "Khalid";