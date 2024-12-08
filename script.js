const express = require('express');
const db = require('./db');
require('dotenv').config();

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());



app.get('/trains', (req, res) => {
    db.query('SELECT * FROM trains', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});
app.get('/trains/search', (req, res) => {
    const { name } = req.query; 
    if (!name) {
        return res.status(400).json({ message: 'Train name is required for search' });
    }
    const query = 'SELECT * FROM trains WHERE name LIKE ?';
    db.query(query, [`%${name}%`], (err, results) => {
        if (err) {
            console.error('Error during train search:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'No trains found matching the search criteria' });
        }

        res.json(results);
    });
});
app.post('/trains', (req, res) => {
    const { name, type, status } = req.body;
    const query = 'INSERT INTO trains (name, train_type, status) VALUES (?, ?, ?)';
    db.query(query, [name, type, status], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Train added successfully!', trainId: result.insertId });
    });
});
app.put('/trains/:id', (req, res) => {
    const { id } = req.params;
    const { name, type, status } = req.body;
    const query = 'UPDATE trains SET name = ?, train_type = ?, status = ? WHERE train_id = ?';
    db.query(query, [name, type, status, id], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.affectedRows === 0) return res.status(404).send({ message: 'Train not found' });
        res.json({ message: 'Train updated successfully!' });
    });
});
app.delete('/trains/:id', (req,res)=>{
    const { id } =req.params;
    db.query ('DELETE FROM trains where train_id =?', [id], (err,result) =>{
        if(err) return res.status (500).send (err);
        if (result.affectedRows ===0) return res.status (404).send ({ message:'Train not found'})
            res.json({ message:'Train deleted successfully'})
    })
})
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
