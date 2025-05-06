const WebSocket = require('ws');

let alpacaSocket;
let currentSymbol = '';
let isAuthenticated = false;

function connectAlpacaWebSocket(wss) {
    alpacaSocket = new WebSocket('wss://stream.data.alpaca.markets/v2/iex');

    alpacaSocket.onopen = () => {
        console.log('Connected to Alpaca WebSocket');
        alpacaSocket.send(JSON.stringify({
            action: 'auth',
            key: process.env.APCA_API_KEY_ID,
            secret: process.env.APCA_API_SECRET_KEY
        }));
    };

    alpacaSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('Raw message from Alpaca:', data);

        if (data[0]?.msg === 'authenticated') {
            isAuthenticated = true;
            console.log('Alpaca authenticated and ready to subscribe.');
        }
        if (data[0]?.T === 'b') {
            console.log('Bar received:', data[0]);
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(data[0]));
                }
            });
        }
    };

    alpacaSocket.onclose = () => {
        console.log('WebSocket closed. Reconnecting...');
        isAuthenticated = false;
        setTimeout(() => connectAlpacaWebSocket(wss), 1000);
    };

    alpacaSocket.onerror = (err) => console.error('WebSocket error:', err);
}

function subscribeToSymbol(symbol) {
    if (!alpacaSocket || !isAuthenticated) return;
    if (currentSymbol) {
        alpacaSocket.send(JSON.stringify({ action: 'unsubscribe', bars: [currentSymbol] }));
    }
    alpacaSocket.send(JSON.stringify({ action: 'subscribe', bars: [symbol] }));
    currentSymbol = symbol;
}

module.exports = { connectAlpacaWebSocket, subscribeToSymbol };
