const PortfolioModel = require('../models/Portfolio');
const TradeModel = require('../models/Trade');

const trade = async (req, res) => {
    const { userId, symbol, quantity, price, action } = req.body;
    console.log('Received trade request data:', req.body);

    if (!userId || !symbol || !quantity || !price) {
        return res.status(400).json({ error: "Missing required fields: userId, symbol, quantity, or price" });
    }

    try {
        // Proceed with trade processing
        const trade = new TradeModel({ userId, symbol, quantity, price, type: action });
        await trade.save();
        console.log('Trade saved:', trade);

        let portfolio = await PortfolioModel.findOne({ userId });
        if (!portfolio) {
            console.log('Portfolio not found, creating new portfolio for user:', userId);
            portfolio = new PortfolioModel({ userId, positions: [] });
        }

        const position = portfolio.positions.find(pos => pos.symbol === symbol);
        if (position) {
            if (action === 'Buy') {
                const newQuantity = position.quantity + quantity;
                const totalCost = (position.averagePrice * position.quantity) + (price * quantity);
                position.averagePrice = totalCost / newQuantity;
                position.quantity = newQuantity;
            } else if (action === 'Sell') {
                if (quantity > position.quantity) {
                    return res.status(400).json({ error: "Not enough shares to sell." });
                }

                position.quantity -= quantity;

                if (position.quantity === 0) {
                    portfolio.positions = portfolio.positions.filter(pos => pos.symbol !== symbol);
                }
            }
        } else {
            portfolio.positions.push({ symbol, quantity, averagePrice: price });
        }

        await portfolio.save();
        console.log('Portfolio updated:', portfolio);

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