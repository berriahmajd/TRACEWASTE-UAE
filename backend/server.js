const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const wasteRoutes = require('./routes/waste');
const statisticsRoutes = require('./routes/statistics');
const wasteCentersRoutes = require('./routes/wasteCenters');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/waste', wasteRoutes);
app.use('/api/statistics', statisticsRoutes);
app.use('/api/wastecenters', wasteCentersRoutes);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error(err));
