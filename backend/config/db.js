const mongoose = require('mongoose');
const dns = require('dns');

// Fix for Windows querySrv DNS resolution issue on some networks
if (dns.setServers) {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
}

const connectDB = async () => {
    console.log('Attempting to connect to MongoDB...');
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected successfully');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    }
};

module.exports = connectDB;
