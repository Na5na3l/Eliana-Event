// Thin MongoDB connection wrapper — one shared client/db for the whole app.
const { MongoClient } = require("mongodb");

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.MONGODB_DB_NAME || "habeshaEvents";

let client;
let db;

async function connectDB() {
  if (db) return db;
  if (!MONGODB_URI) {
    throw new Error(
      "MONGODB_URI is not set. Copy .env.example to .env and fill in your MongoDB Atlas connection string."
    );
  }
  client = new MongoClient(MONGODB_URI);
  await client.connect();
  db = client.db(DB_NAME);
  console.log(`[db] connected to MongoDB (${DB_NAME})`);
  return db;
}

function getDB() {
  if (!db) throw new Error("Database not connected yet — connectDB() must run before this is called.");
  return db;
}

module.exports = { connectDB, getDB };