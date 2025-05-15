const WebSocket = require('ws');

let alpacaSocket;
let currentSymbol = '';
let isAuthenticated = false;
let userSubscriptions = new Map(); // Map each user to his own subscribed symbols
const userPrices = new Map(); // Map each user to his own Map of symbols -> current prices

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
        const symbol = data[0].S;
        const currentPrice = data[0].c;

        // Update per-user prices
        for (const [userId, symbolSet] of userSubscriptions.entries()) {
          if (symbolSet.has(symbol)) {
            if (!userPrices.has(userId)) userPrices.set(userId, new Map());
            userPrices.get(userId).set(symbol, currentPrice);
          }
        }

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

function subscribeToMultipleSymbol(userId, symbolsArr) {
  if (!alpacaSocket || !isAuthenticated) return;

  const newSet = new Set(symbolsArr);
  const prevSet = userSubscriptions.get(userId) || new Set();

  // Symbols that user newly holds
  const toSubscribe = symbolsArr.filter(sym => !prevSet.has(sym));
  
  // Symbols that user no longer holds
  const toUnsubscribe = [...prevSet].filter(sym => !newSet.has(sym));

  // Subscribe
  if (toSubscribe.length > 0) {
    alpacaSocket.send(JSON.stringify({ action: 'subscribe', bars: toSubscribe }));
    console.log(`User ${userId} subscribed to:`, toSubscribe);
  }

  // Unsubscribe
  if (toUnsubscribe.length > 0) {
    alpacaSocket.send(JSON.stringify({ action: 'unsubscribe', bars: toUnsubscribe }));
    console.log(`User ${userId} unsubscribed from:`, toUnsubscribe);
  }

  // Update
  userSubscriptions.set(userId, newSet);
  console.log('Updated subscriptions for', userId, '->', [...newSet]);

}


module.exports = { connectAlpacaWebSocket, subscribeToSymbol, subscribeToMultipleSymbol, userPrices };
