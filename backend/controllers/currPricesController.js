// Get current prices for user's subscribed symbols
const { userPrices } = require('../services/alpacaSocket');

const getPricesForUser = (req, res) => {
  const { userId } = req.params;
  const userPriceMap = userPrices.get(userId);
  if (!userPriceMap) return res.json({});

  const result = {};
  for (const [symbol, price] of userPriceMap.entries()) {
    result[symbol] = price;
  }
  console.log('Fetching prices for', userId, userPrices.get(userId));
  res.json(result);
};

module.exports = { getPricesForUser };
