// Budget API

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const fs = require('fs');

app.use(cors());

app.use('/', express.static('public'));

app.get('/budget', (req, res) => {
    fs.readFile('budget.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Error reading budget data' });
        }
        const budget = JSON.parse(data);
        res.json(budget);
    });
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});