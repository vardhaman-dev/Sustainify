const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts
} = require('../controllers/productController');

// POST /api/products - Create a product listing
router.post('/', verifyToken, createProduct);

// GET /api/products - Get all listings
router.get('/', getAllProducts);

// GET /api/products/search - Search products
router.get('/search', searchProducts);

// GET /api/products/:id - Get single listing
router.get('/:id', getProductById);

// PUT /api/products/:id - Update a product listing
router.put('/:id', verifyToken, updateProduct);

// DELETE /api/products/:id - Delete a product
router.delete('/:id', verifyToken, deleteProduct);

module.exports = router;
