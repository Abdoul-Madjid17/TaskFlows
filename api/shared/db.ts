import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGO_URI!);

export async function getCollection<T>(collectionName: string) {
  if (!client.isConnected?.()) await client.connect();
  const db = client.db(process.env.MONGO_DB_NAME);
  return db.collection<T>(collectionName);
}

