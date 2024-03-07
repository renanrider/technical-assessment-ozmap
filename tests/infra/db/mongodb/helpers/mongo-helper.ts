import { MongoClient } from 'mongodb';

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';

export const MongoHelper = {
  client: null as unknown as MongoClient,
  async connect(): Promise<void> {
    this.client = await MongoClient.connect(mongoUri);
  },

  async disconnect(): Promise<void> {
    await this.client.close();
  },
};
