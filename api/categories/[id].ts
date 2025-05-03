import { MongoClient, ObjectId } from 'mongodb';
import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { connectToDatabase } from '../shared/db';

const handler: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const id = context.bindingData.id;
  const client: MongoClient = await connectToDatabase();
  const db = client.db();
  const collection = db.collection('categories');

  switch (req.method) {
    case 'PUT':
      const updates = req.body;
      await collection.updateOne({ _id: new ObjectId(id) }, { $set: updates });
      context.res = { status: 200, body: { message: 'Category updated' } };
      break;

    case 'DELETE':
      await collection.deleteOne({ _id: new ObjectId(id) });
      context.res = { status: 200, body: { message: 'Category deleted' } };
      break;

    default:
      context.res = { status: 405, body: 'Method Not Allowed' };
      break;
  }
};

export default handler;
