const express = require('express');
const connectDB = require('./db');
const productRoutes = require('./productRoutes');
const comments = require('./comment');
const users = require('./user');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Use product routes
app.use('/api/products', productRoutes);
app.use('/api/comments', comments);
app.use('/api/users', users);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
