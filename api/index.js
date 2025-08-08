require("dotenv").config();
const { MongoClient } = require("mongodb");
const express = require("express");
const bodyParser = require("body-parser");

const client = new MongoClient(process.env.MONGO_URI);

// Store token API
async function storeToken(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { token, appId } = req.body;
  if (!token || !appId) {
    return res.status(400).json({ error: "Missing token or appId" });
  }
  try {
    await client.connect();
    const db = client.db("notifications");
    const collection = db.collection("tokens");
    await collection.insertOne({ token, appId, createdAt: new Date() });
    res.status(200).json({ success: true, message: "Token stored" });
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error.message });
  }
}

// Store app data API
async function storeAppData(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { appId, appName } = req.body;
  if (!appId || !appName) {
    return res.status(400).json({ error: "Missing appId or appName" });
  }
  try {
    await client.connect();
    const db = client.db("notifications");
    const collection = db.collection("apps");
    await collection.insertOne({ appId, appName, createdAt: new Date() });
    res.status(200).json({ success: true, message: "App data stored" });
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error.message });
  }
}

// Get all tokens API
async function getAllTokens(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    await client.connect();
    const db = client.db("notifications");
    const collection = db.collection("tokens");
    const tokens = await collection.find({}).toArray();
    res.status(200).json(tokens);
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error.message });
  }
}

// Get all apps API
async function getAllApps(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    await client.connect();
    const db = client.db("notifications");
    const collection = db.collection("apps");
    const apps = await collection.find({}).toArray();
    res.status(200).json(apps);
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error.message });
  }
}

const app = express();
app.use(bodyParser.json());

// API routes
app.post("/store-token", (req, res) => storeToken(req, res));
app.post("/store-app", (req, res) => storeAppData(req, res));
app.get("/tokens", (req, res) => getAllTokens(req, res));
app.get("/apps", (req, res) => getAllApps(req, res));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
