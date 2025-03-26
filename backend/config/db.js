const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Connected to MongoDB Atlas');
        }).catch(err => {
            console.error('Could not connect to MongoDB Atlas:', err);
        });
};

module.exports = connectDB;
