const express = require('express');
const router = express.Router();
const Product = require('./product');

// Create a new product
router.post('/', async (req, res) => {
    try {
        const { name, price, stock } = req.body;
        const product = new Product({ name, price, stock });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error('Error adding item to collection:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error('Error retrieving products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
