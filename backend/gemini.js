const axios = require("axios");
require("dotenv").config();

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function getProductDescription(title) {
  try {
    const response = await axios.post(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      contents: [{
        parts: [{
          text: `Write a short, engaging, 2-3 line product description for: "${title}". Keep it crisp and clear.`
        }]
      }]
    });

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Gemini error:", error.message);
    return "Description unavailable";
  }
}

async function getConditionEstimate(title) {
  try {
    const response = await axios.post(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      contents: [{
        parts: [{
          text: `Estimate the condition (e.g., new, like new, gently used, old, damaged) of this item based on this title: "${title}". Give only one word.`
        }]
      }]
    });

    return response.data.candidates[0].content.parts[0].text.trim();
  } catch (error) {
    console.error("Gemini error:", error.message);
    return "unknown";
  }
}

module.exports = { getProductDescription, getConditionEstimate };
