const axios = require('axios');

const getLatestNews = async (req, res) => {
	try {
			const response = await axios.get('https://api.marketaux.com/v1/news/all', {
				params: {
					api_token: process.env.MKTAUX_API_SECRET_KEY,
					language: 'en',
				}
			});
			res.json(response.data);
	} catch (error) {
			res.status(500).json({ error: error.message });
	}
};

module.exports = { getLatestNews };