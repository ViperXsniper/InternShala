
const http = require('http');
const app = require('./app');
const url = process.env.PORT;

const server = http.createServer(app);

server.listen(url,()=> {
    console.log(`Server is listning on port ${url}...`);
});