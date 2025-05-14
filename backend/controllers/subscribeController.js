const { subscribeToSymbol, subscribeToMultipleSymbol } = require('../services/alpacaSocket');
const PortfolioModel = require('../models/PortfolioModel');

const subscribe = (req, res) => {
  const { symbol } = req.body;
  console.log(`Subscribe request received for symbol: ${symbol}`);
  subscribeToSymbol(symbol);
  res.json({ message: `Subscribed to ${symbol}` });
};

const subscribeMultiple = async (req, res) => {
  const { userId } = req.params;
  const portfolio = await PortfolioModel.findOne({ userId });
  if (!portfolio) return res.status(404).json("Portfolio not found");

  // Get list of current positions' symbols 
  const symbols = [...new Set(portfolio.positions.map(p => p.symbol))];
  subscribeToMultipleSymbol(userId, symbols);
  res.json({ subscribedSymbols: symbols });
};

module.exports = { subscribe, subscribeMultiple };
