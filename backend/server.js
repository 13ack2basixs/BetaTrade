const http = require('http');
const app = require('./index');
const connectDB = require('./config/db');
const { connectAlpacaWebSocket } = require('./services/alpacaSocket');
const WebSocket = require('ws');

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

connectDB();
connectAlpacaWebSocket(wss);

server.listen(3001, () => {
    console.log("Server listening on http://127.0.0.1:3001");
});
