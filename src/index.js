const express = require('express');
const connectDB = require('./db');
const productRoutes = require('./productRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Use product routes
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
