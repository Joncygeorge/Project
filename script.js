const express = require('express');
const db = require('./db'); // Import the database connection
require('dotenv').config();

const app = express();
app.use(express.json());

// Routes
app.get('/trains', (req, res) => {
    db.query('SELECT * FROM trains', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
