const express = require("express");
const cors = require("cors");
const fetch = (...args) =>
  import("node-fetch").then(({ default: f }) => f(...args));

const app = express();
const PORT = 8080;
const ZOHO_URL = process.env.ZOHO_WEBHOOK_URL;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/trigger", async (req, res) => {
  try {
    const response = await fetch(ZOHO_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json().catch(() => response.text());
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
