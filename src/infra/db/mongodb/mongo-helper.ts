import mongoose, { Mongoose } from 'mongoose';

export const MongoHelper = {
  client: null as unknown as Mongoose,
  uri: null as unknown as string,

  async connect(uri: string, user: string, pass: string): Promise<void> {
    this.uri = uri;

    if (user && pass) {
      this.client = await mongoose.connect(this.uri, {
        user,
        pass,
      });
    } else {
      this.client = await mongoose.connect(this.uri);
    }
  },

  async disconnect(): Promise<void> {
    await this.client.disconnect();
  },
};
