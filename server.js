const express = require("express");
const cors    = require("cors");
const fetch   = (...args) => import("node-fetch").then(({ default: f }) => f(...args));

const app  = express();
const PORT = process.env.PORT || 3000;

const ZOHO_URL = "https://flow.zoho.com/916614704/flow/webhook/incoming?zapikey=1001.5f14221452505497e566ce32b2d990dc.3959af0b4aa2a82d23a89186e31de667&isdebug=true";

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/trigger", async (req, res) => {
  try {
    const response = await fetch(ZOHO_URL, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(req.body)
    });

    const data = await response.json().catch(() => response.text());
    res.status(response.status).json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
