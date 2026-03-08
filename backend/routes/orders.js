const express = require('express');
const router = express.Router();
const db = require('../data/ordersData');

// POST place order
router.post('/', (req, res) => {
  const { items, address, total, payment } = req.body;
  if (!items || !address || !total) {
    return res.status(400).json({ success: false, message: 'items, address, total required' });
  }
  const order = db.add({ items, address, total, payment });
  res.status(201).json({ success: true, data: order });
});

// GET all orders (admin)
router.get('/', (req, res) => {
  res.json({ success: true, data: db.getAll() });
});

// PATCH update order status (admin)
router.patch('/:id/status', (req, res) => {
  const updated = db.updateStatus(req.params.id, req.body.status);
  if (!updated) return res.status(404).json({ success: false, message: 'Order not found' });
  res.json({ success: true, data: updated });
});

module.exports = router;
