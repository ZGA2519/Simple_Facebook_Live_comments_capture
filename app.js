const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Sample data - You can replace this with a database
let products = [
    { id: 1, name: 'Product 1', stock: 10 },
    { id: 2, name: 'Product 2', stock: 20 },
    { id: 3, name: 'Product 3', stock: 15 }
];

// Middleware to parse JSON bodies
app.use(express.json());

// Get all products
app.get('/products', (req, res) => {
    res.json(products);
});

// Get a specific product by ID
app.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(product => product.id === id);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
});

// Update stock of a product by ID
app.put('/products/:id/stock', (req, res) => {
    const id = parseInt(req.params.id);
    const { stock } = req.body;
    const productIndex = products.findIndex(product => product.id === id);
    if (productIndex === -1) {
        return res.status(404).json({ error: 'Product not found' });
    }
    products[productIndex].stock = stock;
    res.json(products[productIndex]);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
