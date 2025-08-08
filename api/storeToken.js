import { MongoClient } from "mongodb";

// MongoDB client setup
const client = new MongoClient(import.meta.env.MONGO_URI);

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Get token and appId from request body
  const { token, appId } = req.body;

  if (!token || !appId) {
    return res.status(400).json({ error: "Missing token or appId" });
  }

  try {
    await client.connect();
    const db = client.db("notifications");
    const collection = db.collection("tokens");

    // Insert into MongoDB
    await collection.insertOne({
      token,
      appId,
      createdAt: new Date()
    });

    res.status(200).json({ success: true, message: "Token stored" });
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error.message });
  }
}
