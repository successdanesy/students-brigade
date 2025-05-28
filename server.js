const express = require('express'); 
const app = express();
const fs = require('fs');
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, 'public'))); // Put your HTML/CSS/JS inside 'public' folder

const DATA_FILE = 'counts.json';

// Endpoint to get current counts
app.get('/api/counts', (req, res) => {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading data');
    res.json(JSON.parse(data));
  });
});

// Endpoint to update counts
app.post('/api/counts', (req, res) => {
  const { pints, lives } = req.body;
  const newData = JSON.stringify({ pints, lives });
  fs.writeFile(DATA_FILE, newData, (err) => {
    if (err) return res.status(500).send('Error saving data');
    res.send('Data saved');
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
