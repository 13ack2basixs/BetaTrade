const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();

const corsOptions = require('./config/corsOptions');

const authRoutes = require('./routes/authRoutes');
const tradeRoutes = require('./routes/tradeRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const marketRoutes = require('./routes/marketRoutes');
const subscribeRoutes = require('./routes/subscribeRoutes');
const companyProfileRoutes = require('./routes/companyProfileRoutes');
const depositRoutes = require('./routes/depositRoutes');

const app = express();

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use('/api/auth', authRoutes);
app.use('/api/trade', tradeRoutes);
app.use('/api', portfolioRoutes);
app.use('/api/market', marketRoutes);
app.use('/api', subscribeRoutes);
app.use('/api/profile', companyProfileRoutes);
app.use('/api', depositRoutes);

module.exports = app;