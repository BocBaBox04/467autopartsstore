// Catalog routes — reads from the legacy parts database
// GET /api/catalog        → all parts (that have a price > 0)
// GET /api/catalog/search → filter by description keyword

const express = require('express');
const router = express.Router();
const db = require('../db');

// Return all parts available in the catalog
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT number, description, price, weight, pictureURL FROM parts WHERE price > 0'
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching catalog:', err.message);
    res.status(500).json({ error: 'Could not load catalog.' });
  }
});

// Search parts by description keyword
router.get('/search', async (req, res) => {
  const { q } = req.query;
  if (!q || q.trim() === '') {
    return res.status(400).json({ error: 'Search query is required.' });
  }

  try {
    const [rows] = await db.query(
      'SELECT number, description, price, weight, pictureURL FROM parts WHERE description LIKE ? AND price > 0',
      [`%${q.trim()}%`]
    );
    res.json(rows);
  } catch (err) {
    console.error('Error searching catalog:', err.message);
    res.status(500).json({ error: 'Search failed.' });
  }
});

module.exports = router;
