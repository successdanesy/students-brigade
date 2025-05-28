const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname)); // serve all static files in your project folder

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(5000, () => {
  console.log('Frontend running at http://localhost:5000');
});
