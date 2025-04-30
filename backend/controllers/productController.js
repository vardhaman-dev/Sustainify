// controllers/productController.js

const Product = require('../models/Product');
const { generateDescription, generateCondition } = require('../services/geminiService');
const VALID_CONDITIONS = ['new', 'like new', 'used', 'heavily used'];

// Function to sanitize the condition input (normalize text to match valid conditions)
const sanitizeCondition = (rawCondition) => {
  const lowerCased = rawCondition.toLowerCase();
  const match = VALID_CONDITIONS.find(valid => lowerCased.includes(valid));
  return match || 'used'; // Default to 'used' if no valid condition found
};

// CREATE a new product
exports.createProduct = async (req, res) => {
  try {
    const { title, image, type, category, price } = req.body;
    
    // Generate description and condition using Gemini API
    const description = await generateDescription(title, image);
    const condition = await generateCondition(title, image);
    
    const product = new Product({
      title,
      description,
      image,
      type,
      category,
      price,
      condition,
      user: req.user.id
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Error creating product' });
  }
};

// GET all products
exports.getAllProducts = async (req, res) => {
  try {
    const { type } = req.query;
    const query = type ? { type } : {};
    
    const products = await Product.find(query)
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
      
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
};

// GET product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('user', 'name email');
      
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Error fetching product' });
  }
};

// UPDATE product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    if (product.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('user', 'name email');
    
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product' });
  }
};

// DELETE product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    if (product.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    await product.remove();
    res.json({ message: 'Product removed' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product' });
  }
};

// SEARCH products (by title, category, or condition)
exports.searchProducts = async (req, res) => {
  try {
    const { q, category } = req.query;
    let query = {};
    
    if (q) {
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ];
    }
    
    if (category) {
      query.category = category;
    }
    
    const products = await Product.find(query)
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
      
    res.json(products);
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ message: 'Error searching products' });
  }
};
