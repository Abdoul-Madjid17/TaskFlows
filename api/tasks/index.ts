import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { getCollection } from '../shared/db';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const tasks = await getCollection('tasks');

  if (req.method === 'GET') {
    const result = await tasks.find().toArray();
    context.res = { status: 200, body: result };
  }

  if (req.method === 'POST') {
    const newTask = { ...req.body, createdAt: new Date(), updatedAt: new Date() };
    const result = await tasks.insertOne(newTask);
    context.res = { status: 201, body: result.ops[0] };
  }
};

export default httpTrigger;
