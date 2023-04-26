import { MongoClient } from "mongodb";

const URI = process.env.MONGODB_URI;
const MONGO_DB = process.env.MONGO_DB;
const client = new MongoClient(URI);
let db;

export const getDb = async () => {
  if (db) return db;
  else {
    await client.connect();
    db = client.db(MONGO_DB);
    return db;
  }
};
