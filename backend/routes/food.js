const express = require('express');
const router = express.Router();
const db = require('../data/foodData');

// GET all foods (optional ?category= filter, ?search= filter)
router.get('/', (req, res) => {
  let foods = db.getAll();
  if (req.query.category && req.query.category !== 'All') {
    foods = foods.filter(f => f.category === req.query.category);
  }
  if (req.query.search) {
    const q = req.query.search.toLowerCase();
    foods = foods.filter(f =>
      f.name.toLowerCase().includes(q) ||
      f.description.toLowerCase().includes(q) ||
      f.category.toLowerCase().includes(q)
    );
  }
  res.json({ success: true, data: foods });
});

// GET single food
router.get('/:id', (req, res) => {
  const food = db.getById(req.params.id);
  if (!food) return res.status(404).json({ success: false, message: 'Food not found' });
  res.json({ success: true, data: food });
});

// POST add food
router.post('/', (req, res) => {
  const { name, description, price, rating, category, image } = req.body;
  if (!name || !price || !category) {
    return res.status(400).json({ success: false, message: 'name, price, category required' });
  }
  const newFood = db.add({ name, description, price: parseFloat(price), rating: parseFloat(rating) || 4.0, category, image: image || '' });
  res.status(201).json({ success: true, data: newFood });
});

// PUT update food
router.put('/:id', (req, res) => {
  const updated = db.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ success: false, message: 'Food not found' });
  res.json({ success: true, data: updated });
});

// DELETE food
router.delete('/:id', (req, res) => {
  const ok = db.remove(req.params.id);
  if (!ok) return res.status(404).json({ success: false, message: 'Food not found' });
  res.json({ success: true, message: 'Deleted successfully' });
});

module.exports = router;
