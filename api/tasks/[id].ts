import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { ObjectId } from 'mongodb';
import { getCollection } from '../shared/db';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const id = context.bindingData.id;
  const tasks = await getCollection('tasks');

  if (req.method === 'PUT') {
    const updates = { ...req.body, updatedAt: new Date() };
    await tasks.updateOne({ _id: new ObjectId(id) }, { $set: updates });
    context.res = { status: 200, body: { message: 'Task updated' } };
  }

  if (req.method === 'DELETE') {
    await tasks.deleteOne({ _id: new ObjectId(id) });
    context.res = { status: 200, body: { message: 'Task deleted' } };
  }
};

export default httpTrigger;
