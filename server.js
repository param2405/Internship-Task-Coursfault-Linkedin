require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB (centralized helper)
connectDB(process.env.MONGO_URI).catch(err => {
  console.error('Exiting due to DB connection failure');
  process.exit(1);
});

// Routes
const eventRoutes = require('./routes/eventRoutes')
const sessionRoutes = require('./routes/sessionRoutes')
const analyticsRoutes = require('./routes/analyticsRoutes')
const heatmapRoutes = require('./routes/heatmapRoutes')

app.use('/api/events', eventRoutes)
app.use('/api/sessions', sessionRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/heatmap', heatmapRoutes)

app.get('/', (req, res) => res.send('API Running'))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));