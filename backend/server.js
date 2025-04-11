const http = require("http");
const app = require("./app");
const {initailizeSocket} = require("./socket");

const port = process.env.PORT || 3000;

const server = http.createServer(app);

initailizeSocket(server);

server.listen(port, ()=>{
    console.log("server connected on", port);
})