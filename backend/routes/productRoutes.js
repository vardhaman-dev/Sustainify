const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { verifyToken } = require('../middleware/authMiddleware');

// POST /api/products - Create a product listing
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, description, condition, category, image } = req.body;

    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 1); // expires after 1 month

    const newProduct = new Product({
      title,
      description,
      condition,
      category,
      image,
      postedBy: req.user.id, // Assigning the user from JWT
      expiryDate,
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (err) {
    res.status(400).json({ message: 'Error creating product', error: err });
  }
});

// GET /api/products - Get all listings
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('postedBy', 'username email'); // Ensure postedBy is populated with user details
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err });
  }
});

// GET /api/products/:id - Get single listing
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('postedBy', 'username email'); // Populate postedBy
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product', error: err });
  }
});

// PUT /api/products/:id - Update a product listing
router.put('/:id', verifyToken, async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
  
      // Check if the product exists
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Ensure that the user is the one who created the product
      if (product.postedBy.toString() !== req.user.id) {
        return res.status(403).json({ message: 'You are not authorized to update this product' });
      }
  
      // Update product details
      const { title, description, condition, category, image } = req.body;
      product.title = title || product.title;
      product.description = description || product.description;
      product.condition = condition || product.condition;
      product.category = category || product.category;
      product.image = image || product.image;
  
      await product.save();
      res.json({ message: 'Product updated successfully', product });
    } catch (err) {
      res.status(500).json({ message: 'Error updating product', error: err });
    }
  });


// backend/routes/productRoutes.js

router.delete('/:id', verifyToken, async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Ensure the product was posted by the authenticated user
      if (product.postedBy.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Unauthorized action' });
      }
  
      // Use deleteOne instead of remove
      await Product.deleteOne({ _id: req.params.id });
  
      res.json({ message: 'Product deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting product', error: err.message });
    }
  });
  
  
  

module.exports = router;
