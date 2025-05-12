const mongoose = require('mongoose');
const PortfolioModel = require('../models/Portfolio');

const depositFunds = async (req, res) => {
	const { userId } = req.body;
	console.log(`Deposit request received for userId: ${userId}`);
	try {
			const portfolio = await PortfolioModel.findOne({ userId: new mongoose.Types.ObjectId(userId) });
			if (portfolio) {
					portfolio.totalCash += 10000;
					await portfolio.save();
					res.json({message: "Deposit successful:", portfolio});
			} else {
					res.status(404).json("Portfolio not found");
			}
	} catch (err) {
			console.error('Error fetching portfolio:', err);
			res.status(500).json(err.message);
	}
};

const getCashAndAssets = async (req, res) => {
	const { userId } = req.body;
	try {
		const cashAndAssets = await PortfolioModel.findOne({ userId: new mongoose.Types.ObjectId(userId) }, 'totalCash totalAssets');
		console.log("Cash and Assets:", cashAndAssets);
		res.json(cashAndAssets);
	} catch (err) {
		console.error("Error fetching cash and assets:", err);
		res.status(500).json(err.message);
	}
};

module.exports = { depositFunds, getCashAndAssets };