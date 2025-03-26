const axios = require('axios');

const getMarketStatus = async (req, res) => {
    try {
        const response = await axios.get('https://paper-api.alpaca.markets/v2/clock', {
            headers: {
                'APCA-API-KEY-ID': process.env.APCA_API_KEY_ID,
                'APCA-API-SECRET-KEY': process.env.APCA_API_SECRET_KEY
            }
        });
        res.json({ is_open: response.data.is_open });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getHistoricalData = async (req, res) => {
    const { symbol } = req.params;
    const endDate = new Date().toISOString();
    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 3);

    try {
        const response = await axios.get('https://data.alpaca.markets/v2/stocks/bars', {
            params: {
                symbols: symbol,
                timeframe: '1Day',
                start: startDate.toISOString(),
                end: endDate,
                limit: 1000,
                feed: 'iex'
            },
            headers: {
                'APCA-API-KEY-ID': process.env.APCA_API_KEY_ID,
                'APCA-API-SECRET-KEY': process.env.APCA_API_SECRET_KEY
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getMarketStatus, getHistoricalData };
