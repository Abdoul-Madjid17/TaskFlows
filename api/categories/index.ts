import { MongoClient } from 'mongodb';
import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { connectToDatabase } from '../shared/db';

const handler: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const client: MongoClient = await connectToDatabase();
  const db = client.db();
  const collection = db.collection('categories');

  switch (req.method) {
    case 'GET':
      const categories = await collection.find().toArray();
      context.res = { status: 200, body: categories };
      break;

    case 'POST':
      const newCategory = req.body;
      await collection.insertOne(newCategory);
      context.res = { status: 201, body: { message: 'Category created', category: newCategory } };
      break;

    default:
      context.res = { status: 405, body: 'Method Not Allowed' };
      break;
  }
};

export default handler;
