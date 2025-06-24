// MagicChat: Disney-Themed ChatGPT Wrapper Backend (Node.js/Express)

const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // allow all origins
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "OpenAI-Project": "proj_pzMWUAjkDKn9ZMDIUhofLsQT"
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, no magic today.";
    res.json({ reply });

  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({ reply: "Oops! MagicChat hit a snag. Try again later." });
  }
});

app.listen(PORT, () => {
  console.log(`✨ MagicChat backend running on http://localhost:${PORT}`);
});
