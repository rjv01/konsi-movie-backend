require("dotenv").config();
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({
  apiKey:process.env.GEMINI_API_KEY,
});

async function getProgrammingJoke() {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash', 
      contents: 'Tell me a short joke about programming.',
    });

    console.log(response.text);

  } catch (error) {
    console.error("An error occurred:", error);
  }
}

getProgrammingJoke();