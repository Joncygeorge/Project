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


// create a new train
app.post('/trains', (req, res) => {
    const { name, type, status } = req.body;
    const query = 'INSERT INTO trains (name, type, status) VALUES (?, ?, ?)';
    db.query(query, [name, type, status], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Train added successfully!', trainId: result.insertId });
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


// 7. Add a schedule for a train
app.post('/schedule', (req, res) => {
    const { train_id, station_id, arrival_time, departure_time } = req.body;
    const query = `
        INSERT INTO schedules (train_id, station_id, arrival_time, departure_time) 
        VALUES (?, ?, ?, ?)`;
    db.query(query, [train_id, station_id, arrival_time, departure_time], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Schedule added successfully!', scheduleId: result.insertId });
    });
});

// 4. Update a train
app.put('/trains/:id', (req, res) => {
    const { id } = req.params;
    const { name, type, status } = req.body;
    const query = 'UPDATE trains SET name = ?, type = ?, status = ? WHERE train_id = ?';
    db.query(query, [name, type, status, id], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.affectedRows === 0) return res.status(404).send({ message: 'Train not found' });
        res.json({ message: 'Train updated successfully!' });
    });
});

// 8. Update a schedule
app.put('/schedule/:id', (req, res) => {
    const { id } = req.params;
    const { train_id, station_id, arrival_time, departure_time } = req.body;
    const query = `
        UPDATE schedules 
        SET train_id = ?, station_id = ?, arrival_time = ?, departure_time = ? 
        WHERE schedule_id = ?`;
    db.query(query, [train_id, station_id, arrival_time, departure_time, id], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.affectedRows === 0) return res.status(404).send({ message: 'Schedule not found' });
        res.json({ message: 'Schedule updated successfully!' });
    });
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
