const axios = require('axios');

const getCompanyProfile = async (req, res) => {
    const { symbol } = req.params;

    try {
        const response = await axios.get("https://financialmodelingprep.com/stable/profile", {
            params: {
                symbol: symbol,
                apikey: process.env.FMP_API_SECRET_KEY
            }
        });
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports = { getCompanyProfile };