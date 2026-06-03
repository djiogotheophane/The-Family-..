import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: AI Concierge Chatbot
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, userLanguage } = req.body;

      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages array is required." });
      }

      // Convert messages array to Gemini format
      const lastMessage = messages[messages.length - 1];
      const chatHistory = messages.slice(0, -1).map((msg: any) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      }));

      // Establish luxurious AI system prompt
      const systemInstruction = `You are Nara, the premium AI Concierge for the luxurious Thai restaurant 'THE FAMILY'.
Our brand represents the extreme refinement of a 5-star Thai resort and the warmth of traditional Thai hospitality.
Your tone must be exceptionally polite, elegant, warm, and helpful. Use traditional Thai greetings conceptually (like "Sawatdee") when appropriate, but maintain a premium and sophisticated discourse.

Information about 'THE FAMILY':
- Hours: Every day, 12:00 to 14:30 (Lunch) & 19:00 to 23:00 (Dinner).
- Address: 12 Rue de la Paix, Paris, France (and beautiful virtual salons online).
- Phone: +33 1 23 45 67 89 (and global priority line on WhatsApp).
- Table Booking: Guests can choose and reserve specific tables in real-time through our interactive table visualizer.
- Delivery & Takeaway: Available with premium packaging.
- Ingredients: 100% authentic, imported directly from organic farms in Chiang Mai and Bangkok. We offer Vegan, Vegetarian, Gluten-Free, and custom allergy-safe curation.
- Loyalty: "Jasmine Premium Club" offers exclusive rewards (earn points on each visit to claim royal desserts or VIP private dining salon seats).

Answer the user directly and concisely in an elegant layout. Speak in the language matching the user's prompt (French, English, German, Spanish, Portuguese, Thai, Italian, Chinese, Japanese, or Korean). Always prioritize culinary excellence and genuine customer care.`;

      // Use modern SDK with systemInstruction
      const chat = ai.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction,
          temperature: 0.7,
        },
        history: chatHistory,
      });

      const result = await chat.sendMessage({
        message: lastMessage.content,
      });

      const replyText = result.text || "Désolé, je ne parviens pas à traiter votre demande pour le moment.";

      return res.json({ reply: replyText });
    } catch (error: any) {
      console.error("Gemini API Error in Server:", error);
      return res.status(500).json({
        error: "Erreur lors du traitement de votre demande par le service de conciergerie.",
        details: error?.message || error,
      });
    }
  });

  // API Route: Contact Form Simulation
  app.post("/api/contact", (req, res) => {
    const { name, email, message } = req.body;
    // Mock successful database persistence
    return res.json({
      success: true,
      message: `Merci ${name}, votre message a bien été transmis à la direction de THE FAMILY. Une réponse vous sera apportée sous 12h.`,
    });
  });

  // Serve Frontend assets using Vite or Static files depending on ENV
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`THE FAMILY high-end restaurant backend listening at http://0.0.0.0:${PORT}`);
  });
}

startServer();
