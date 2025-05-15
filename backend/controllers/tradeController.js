const PortfolioModel = require('../models/Portfolio');
const TradeModel = require('../models/Trade');

const trade = async (req, res) => {
    const { userId, symbol, price, action } = req.body;
    const quantity = Number(req.body.quantity);
    console.log('Received trade request data:', req.body);

    if (!userId || !symbol || !quantity || !price || isNaN(quantity)) {
        return res.status(400).json({ error: "Missing required fields: userId, symbol, quantity, or price" });
    }

    try {
      let portfolio = await PortfolioModel.findOne({ userId });
      const position = portfolio.positions.find(pos => pos.symbol === symbol);
      if (position) {
        if (action === 'Buy') {
            if (portfolio.totalCash < price * quantity) {
                return res.status(400).json({ error: "Insufficient funds to buy." });
            }

            // Update new average price and quantity
            const newQuantity = position.quantity + quantity;
            const totalCost = (position.averagePrice * position.quantity) + (price * quantity);
            position.averagePrice = totalCost / newQuantity;
            position.quantity = newQuantity;

            // Update totalCash and totalAssets
            portfolio.totalCash -= (price * quantity);
            portfolio.totalAssets += price * quantity;
        } else if (action === 'Sell') {
            if (quantity > position.quantity) {
                return res.status(400).json({ error: "Not enough shares to sell." });
            }

            // Update totalCash and totalAssets
            position.quantity -= quantity;
            portfolio.totalCash += (price * quantity);
            portfolio.totalAssets -= position.averagePrice * quantity; 

            if (position.quantity === 0) {
                portfolio.positions = portfolio.positions.filter(pos => pos.symbol !== symbol);
            }
        }
      } else {
        if (action === 'Buy') {
            if (portfolio.totalCash < price * quantity) {
                return res.status(400).json({ error: "Insufficient funds to buy." });
            }
            
            portfolio.positions.push({ symbol, quantity, averagePrice: price });
            portfolio.totalCash -= price * quantity;
            portfolio.totalAssets += price * quantity;
        } else if (action === 'Sell') {
            return res.status(400).json({ error: "Cannot sell a stock you don't own." });
        }
      }

      await portfolio.save(); 
      console.log('Portfolio updated:', portfolio);

      const trade = new TradeModel({ userId, symbol, quantity, price, type: action });
      await trade.save();
      console.log('Trade saved:', trade);

      res.status(201).json(trade);
    } catch (err) {
        console.error('Error processing trade request:', err);
        res.status(500).json({ error: err.message });
    }
};

const getAllTrades = async (req, res) => {
    try {
        const allTrades = await TradeModel.find();
        res.json(allTrades);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports = { trade, getAllTrades };