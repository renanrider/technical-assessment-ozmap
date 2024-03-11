import { AddUserRepositoryMongo } from '@/infra/db/mongodb';
import { MongoHelper } from '@/infra/db/mongodb/mongo-helper';
import { User } from '../../../domain/models';

const userMock: User = {
  name: 'any_name',
  email: 'any_email@email.com',
  address: 'any_address',
};

describe('AddUserRepositoryMongo', () => {
  beforeAll(async () => {
    const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/test';
    await MongoHelper.connect(mongoUrl, '', '');
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    await MongoHelper.client.model('User').deleteMany();
  });

  it('return an user when AddUserRepositoryMongo.create', async () => {
    const sut = new AddUserRepositoryMongo();
    const user = await sut.create(userMock);

    expect(user).toBeTruthy();
    expect(user.id).toBeTruthy();
    expect(user.name).toBe(userMock.name);
    expect(user.email).toBe(userMock.email);
  });
});
