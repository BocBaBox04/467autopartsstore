// Main entry point for the auto parts store
// Starts Express server and wires up routes

const express = require('express');
const path = require('path');

const catalogRoutes = require('./routes/catalog');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/catalog', catalogRoutes);

// Serve the main page for any unmatched route
app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
