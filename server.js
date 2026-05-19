const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT;

if (!PORT) throw new Error("Missing PORT");

const DIFY_MCP_URL = process.env.DIFY_MCP_URL;
if (!DIFY_MCP_URL) throw new Error("Missing DIFY_MCP_URL");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/trigger", async (req, res) => {
  const response = await fetch(DIFY_MCP_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  });

  const text = await response.text();
  res.status(response.status).send(text);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
