const express = require ('express');
const router = express.Router();
const Product= ('../models/Product'); 

// Create a product
router.post('/', async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const product = new Product({ name, price, description });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while creating product' });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching products' });
  }
});

// Update a product
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;
    const product = await Product.findByIdAndUpdate(id, { name, price, description }, { new: true });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while updating product' });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (product) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while deleting product' });
  }
});

module.exports = router;

