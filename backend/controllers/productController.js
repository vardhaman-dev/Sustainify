// controllers/productController.js

const Product = require('../models/Product');
const { generateDescriptionAndCondition } = require('./geminiController'); // Correct path to geminiController
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
    const { title, description, category, condition, image } = req.body;

    // Use Gemini API to generate product description, condition, and category based on the title and image
    const { description: generatedDescription, condition: generatedCondition, category: generatedCategory } = await generateDescriptionAndCondition(title, image);

    // Sanitize the generated condition to ensure it's a valid value
    const sanitizedCondition = sanitizeCondition(generatedCondition);

    // Generate a simple description using the fetched data
    const simpleDescription = `${title} is a high-quality product in the ${generatedCategory} category. It offers excellent value and is perfect for any space. This ${sanitizedCondition} product is an ideal addition to your collection.`;

    // Create a new product document
    const newProduct = new Product({
      title,
      description: simpleDescription,  // Use the generated description
      category: generatedCategory,     // Use the generated category
      condition: sanitizedCondition,   // Use the sanitized condition
      image,
      postedBy: req.user.id,           // Assuming you have user authentication in place (e.g., using JWT)
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),  // Set expiry date 1 year later
    });

    // Save the product to the database
    await newProduct.save();

    // Send the response with the new product details
    res.status(201).json({
      message: 'Product created successfully',
      product: newProduct,
    });
  } catch (error) {
    console.error('Product creation error:', error);
    res.status(500).json({
      message: 'Error creating product',
      error,
    });
  }
};


// GET all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('postedBy', 'name email'); // Populate user details

    // Respond with the list of products
    res.status(200).json({
      message: 'All products retrieved successfully',
      products,
    });
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).json({
      message: 'Error retrieving products',
      error,
    });
  }
};

// GET product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('postedBy', 'name email');

    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }

    res.status(200).json({
      message: 'Product retrieved successfully',
      product,
    });
  } catch (error) {
    console.error('Error retrieving product by ID:', error);
    res.status(500).json({
      message: 'Error retrieving product',
      error,
    });
  }
};

// UPDATE product
exports.updateProduct = async (req, res) => {
  try {
    const { title, description, category, condition, image } = req.body;
    const updatedData = {
      title,
      description,
      category,
      condition: sanitizeCondition(condition),
      image,
    };

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }

    res.status(200).json({
      message: 'Product updated successfully',
      product: updatedProduct,
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      message: 'Error updating product',
      error,
    });
  }
};

// DELETE product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }

    res.status(200).json({
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      message: 'Error deleting product',
      error,
    });
  }
};

// SEARCH products (by title, category, or condition)
exports.searchProducts = async (req, res) => {
  try {
    const { title, category, condition } = req.query;

    const query = {};
    if (title) query.title = new RegExp(title, 'i'); // Case-insensitive search
    if (category) query.category = new RegExp(category, 'i');
    if (condition) query.condition = sanitizeCondition(condition);

    const products = await Product.find(query).populate('postedBy', 'name email');

    res.status(200).json({
      message: 'Products retrieved successfully',
      products,
    });
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({
      message: 'Error searching products',
      error,
    });
  }
};
