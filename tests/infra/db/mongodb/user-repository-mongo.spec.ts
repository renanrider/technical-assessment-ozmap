import {
  AddUserRepositoryMongo,
  GetAllUsersRepositoryMongo,
} from '@/infra/db/mongodb';
import { MongoHelper } from '@/infra/db/mongodb/mongo-helper';
import { User } from '../../../domain/models';

const userMock: User = {
  name: 'any_name',
  email: 'any_email@email.com',
  address: 'any_address',
};

const usersMock: User[] = [
  {
    name: 'user1_name',
    email: 'user1_email@email.com',
    address: 'user1_address',
  },
  {
    name: 'user2_name',
    email: 'user2_email@email.com',
    address: 'user2_address',
  },
  {
    name: 'user3_name',
    email: 'user3_email@email.com',
    address: 'user3_address',
  },
];

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

  it('return all users when GetAllUsersRepository.findAll', async () => {
    const addUserRepositoryMongo = new AddUserRepositoryMongo();

    await addUserRepositoryMongo.create(usersMock[0]);
    await addUserRepositoryMongo.create(usersMock[1]);
    await addUserRepositoryMongo.create(usersMock[2]);

    const sut = new GetAllUsersRepositoryMongo();
    const users = await sut.findAll();

    expect(users).toBeTruthy();
    expect(users).toHaveLength(3);
    expect(users![0].id).toBeTruthy();
    expect(users![0].name).toBe(usersMock[0].name);
    expect(users![0].email).toBe(usersMock[0].email);
    expect(users![0].address).toBe(usersMock[0].address);
  });

  it('return null when GetAllUsersRepository.findAll is empty', async () => {
    const sut = new GetAllUsersRepositoryMongo();
    const users = await sut.findAll();

    expect(users).toBeTruthy();
    expect(users).toHaveLength(0);
  });
});
