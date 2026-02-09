import express from "express";
import multer from "multer";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import { GoogleGenAI } from "@google/genai";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const upload = multer({ dest: "uploads/" });

app.get("/", (req, res) => {
  res.send("Backend is working");
});


app.post("/analyze", upload.array("screenshots"), async (req, res) => {
  try {
    const results = [];

    for (let file of req.files) {
      const imageBuffer = fs.readFileSync(file.path);
      const base64 = imageBuffer.toString("base64");

      const prompt = `
      You are an AI that classifies screenshots into ONE of three intents: BUY, STUDY, REMEMBER.

Rules:
1. BUY → images of products, furniture, gadgets, anything user might buy. No humans.
2. STUDY → slides, notes, diagrams, screenshots of text content.
3. REMEMBER → selfies, events, quotes, places, images with humans.

Examples:
- Amazon product page → BUY
- Lecture slide screenshot → STUDY
- Vacation photo with friends → REMEMBER

Return ONLY JSON:
{
  "intent": "",
  "category": "",
  "confidence": 0-1
}
`;

      const result = await genAI.models.generateContent({
        model: "gemini-3-flash-preview", // ✅ Use Gemini 3
        contents: [
          {
            role: "user",
            parts: [
              { text: prompt },
              {
                inlineData: {
                  mimeType: file.mimetype,
                  data: base64,
                },
              },
            ],
          },
        ],
      });

      let text = result.text;

      text = text.replace(/```json/g, "").replace(/```/g, "").trim();

      try {
        results.push(JSON.parse(text));
      } catch {
        results.push({
          intent: "unknown",
          category: "",
          confidence: 0,
        });
      }
    }

    res.json(results);
  } catch (error) {
    console.error("Route error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/compare", async (req, res) => {
  try {
    let { items } = req.body;

    // Filter only BUY items (case-insensitive)
    const buyItems = items.filter(item => item.intent.toUpperCase() === "BUY");

    if (buyItems.length === 0) {
      return res.json({ table: [], message: "No products in 'BUY' category to compare." });
    }

    const prompt = `
You are comparing multiple products that are for buying purposes only. 
Create a comparison table in JSON format.
Each product has these fields: name, category, primary_use, environment, mobility, scale, typical_user, power_source, key_function.
Make sure all buy items are included.
Return ONLY valid JSON like this:

${JSON.stringify(buyItems, null, 2)}
`;

    const result = await genAI.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    let tableJson;
    try {
      tableJson = JSON.parse(result.text.replace(/```/g, "").trim());
    } catch {
      tableJson = [];
    }

    res.json({ table: tableJson });

  } catch (error) {
    console.error("Compare route error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});





app.listen(5000, () => console.log("Server running on port 5000"));
