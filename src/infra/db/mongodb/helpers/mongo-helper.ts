import { Collection, MongoClient } from "mongodb";

export interface MongoCollection {
  _id: string;
  [key: string]: unknown;
}

export const MongoHelper = {
  client: null as unknown as MongoClient,

  async connect(uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri);
  },

  async disconnect(): Promise<void> {
    await this.client.close();
  },

  getCollection(name: string): Collection {
    return this.client.db().collection(name);
  },

  map<Model extends { id: string }>(collection: MongoCollection): Model {
    const { _id, ...collectionWithoutId } = collection;
    const model = {
      id: _id,
      ...collectionWithoutId,
    } as Model;

    return model;
  },
};
