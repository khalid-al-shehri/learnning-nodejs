// Create server
const http = require('http');

// Test nodemon
console.log("NODEMON is here");

const routes = require('./routes');
const server = http.createServer(routes.handler);
server.listen(3000);