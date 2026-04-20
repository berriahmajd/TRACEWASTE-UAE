const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const wasteReportRoutes = require('./routes/wasteReports');
const wasteCenterRoutes = require('./routes/wasteCenters');
const statisticsRoutes = require('./routes/statistics');

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/wasteReports', wasteReportRoutes);
app.use('/api/wasteCenters', wasteCenterRoutes);
app.use('/api/statistics', statisticsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
