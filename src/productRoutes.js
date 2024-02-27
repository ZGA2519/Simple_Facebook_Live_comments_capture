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

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update a product by ID
router.put('/:id', async (req, res) => {
    try {
        const { name, price, stock } = req.body;
        const product = await Product.findByIdAndUpdate(req.params.id, { name, price, stock }, { new: true });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
