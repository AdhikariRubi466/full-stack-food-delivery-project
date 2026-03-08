require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:3000'], credentials: true }));
app.use(express.json());

// Routes
app.use('/api/food', require('./routes/food'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/payment', require('./routes/payment'));

// Health check
app.get('/', (req, res) => {
  res.json({ message: '🍅 Tomato API running', version: '1.0.0' });
});

app.listen(PORT, () => {
  console.log(`🍅 Tomato Backend running on http://localhost:${PORT}`);
});
