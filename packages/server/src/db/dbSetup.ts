import * as mongoDB from "mongodb";
import { seedDb } from "./seed";

export const collections: { publications?: mongoDB.Collection } = {}

export async function connectToDatabase() {
  if (!process.env.MONGODB_URI || !process.env.DB_NAME) {
    throw new Error("No connection string or db name provided, cannot connect to db");
  }
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.MONGODB_URI);

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);
  const publicationsCollection: mongoDB.Collection = db.collection("publications");
  collections.publications = publicationsCollection;

  // Create indexes for performance since filter by tag is a feature
  collections.publications.createIndex({ manualTags: 1 });
  // enforce uniqueness on key
  collections.publications.createIndex({ key: 1 }, { unique: true });

  await seedDb();

  console.log(`Successfully connected to database: ${db.databaseName} and collection: ${publicationsCollection.collectionName}`);
}