const express = require('express');
const router = express.Router();
require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');

// POST create payment intent
router.post('/create-intent', async (req, res) => {
  try {
    const { amount, currency = 'inr' } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: 'Valid amount required' });
    }

    // If no real key, return mock client secret for demo
    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'sk_test_placeholder') {
      return res.json({
        success: true,
        clientSecret: 'pi_demo_secret_' + Date.now(),
        demo: true,
        message: 'Demo mode - add STRIPE_SECRET_KEY to .env for real payments'
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // convert to paise
      currency,
      automatic_payment_methods: { enabled: true }
    });

    res.json({ success: true, clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
