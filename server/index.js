require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db.js');
const userRoutes = require('./routes/router.user.js');
const postRoutes = require('./routes/router.post');
const chatRoutes = require('./routes/router.chat');


const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/chat', chatRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});