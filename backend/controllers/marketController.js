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
    const { timeframe = 'daily' } = req.query;
    let tf;
    const endDate = new Date().toISOString();
    const startDate = new Date();

    // Set view mode 
    if (timeframe === 'live') {
        tf = '1Min'; 
        startDate.setMinutes(startDate.getMinutes() - 50);
    } else if (timeframe === 'weekly') {
        tf = '1Week';
        startDate.setDate(startDate.getDate() - 7 * 50);
    } else if (timeframe === 'monthly') {
        tf = '1Month'; 
        startDate.setMonth(startDate.getMonth() - 50);
    } else if (timeframe === 'yearly') {
        tf = '12Month'; 
        startDate.setFullYear(startDate.getFullYear() - 10);
    } else {
        tf = '1Day'; 
        startDate.setDate(startDate.getDate() - 50);
    }

    try {
        const response = await axios.get('https://data.alpaca.markets/v2/stocks/bars', {
            params: {
                symbols: symbol,
                timeframe: tf,
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
