const PortfolioModel = require('../models/Portfolio');
const TradeModel = require('../models/Trade');

const getPortfolio = async (req, res) => {
    const { userId } = req.params;
    console.log(`Portfolio request received for userId: ${userId}`);
    try {
        const portfolio = await PortfolioModel.findOne({ userId });
        console.log('Fetched Portfolio:', portfolio);
        if (portfolio) {
            res.json(portfolio);
        } else {
            console.log('Portfolio not found');
            res.status(404).json("Portfolio not found");
        }
    } catch (err) {
        console.error('Error fetching portfolio:', err);
        res.status(500).json(err.message);
    }
};

const getTransactions = async (req, res) => {
    const { userId } = req.params;
    console.log(`Transaction history request received for userId: ${userId}`);
    try {
        const transactions = await TradeModel.find({ userId });
        console.log('Fetched Transactions:', transactions);
        res.json(transactions);
    } catch (err) {
        console.error('Error fetching transaction history:', err);
        res.status(500).json(err.message);
    }
};

module.exports = { getPortfolio, getTransactions };