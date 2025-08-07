require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db.js');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});