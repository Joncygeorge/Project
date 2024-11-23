const express = require('express');
const db = require('./db'); // Import the database connection
require('dotenv').config();

const app = express();
app.use(express.json());

// Routes
// get all trains
app.get('/trains', (req, res) => {
    db.query('SELECT * FROM trains', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});


// get a single train by id
app.get('/trains/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM trains WHERE train_id = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send({ message: 'Train not found' });
        res.json(results[0]);
    });
});

//  Get train schedule by train ID
app.get('/schedule/:train_id', (req, res) => {
    const { train_id } = req.params;
    const query = `
        SELECT t.name AS train_name, s.name AS station_name, sc.arrival_time, sc.departure_time 
        FROM schedules sc 
        JOIN trains t ON sc.train_id = t.train_id 
        JOIN stations s ON sc.station_id = s.station_id 
        WHERE t.train_id = ?`;
    db.query(query, [train_id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
