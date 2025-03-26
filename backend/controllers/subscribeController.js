const { subscribeToSymbol } = require('../services/alpacaSocket');

const subscribe = (req, res) => {
    const { symbol } = req.body;
    console.log(`Subscribe request received for symbol: ${symbol}`);
    subscribeToSymbol(symbol);
    res.json({ message: `Subscribed to ${symbol}` });
};

module.exports = { subscribe };
