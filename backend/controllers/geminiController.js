// controllers/geminiController.js

const axios = require('axios');

// Function to generate product description and condition from title and image
const generateDescriptionAndCondition = async (title, imageUrl) => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

  const prompt = `Generate a product description, condition, and category for a product titled "${title}". Here is the image: ${imageUrl}. Provide a clean description, the condition (new, used, etc.), and a category that fits the product.`;

  const body = {
    contents: [
      {
        parts: [
          { text: prompt }
        ]
      }
    ]
  };

  try {
    const res = await axios.post(url, body);
    const output = res.data.candidates[0]?.content?.parts[0]?.text || "";

    // Extract description, condition, and category from the output
    const descriptionMatch = output.match(/description[:\-]?\s*(.*)/i);
    const conditionMatch = output.match(/condition[:\-]?\s*(.*)/i);
    const categoryMatch = output.match(/category[:\-]?\s*(.*)/i);

    // Ensure that description, condition, and category are properly extracted
    const description = descriptionMatch ? descriptionMatch[1].trim() : "A high-quality product"; // Fallback description
    const condition = conditionMatch ? conditionMatch[1].trim() : "used"; // Default to 'used' if no condition found
    let category = categoryMatch ? categoryMatch[1].trim() : "Miscellaneous"; // Default category if not found

    // Clean up category if it still includes unwanted text
    if (category.includes("based on the image") || category.includes("product title")) {
      category = "Miscellaneous"; // Fallback to Miscellaneous if category parsing is still incorrect
    }

    return {
      description,
      condition,
      category
    };
  } catch (err) {
    console.error("Gemini API error:", err.message);
    return {
      description: "Auto description failed", // Fallback if there's an error
      condition: "used",
      category: "Miscellaneous"
    };
  }
};

module.exports = { generateDescriptionAndCondition };
