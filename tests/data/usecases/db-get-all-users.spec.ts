import { User } from '@/domain/models/user';
import { GetAllUsersRepository } from '@/data/protocols/db/user';
import { DbGetAllUsers } from '@/data/usecases';

const mockResponse = (): User[] => [
  {
    id: '1',
    name: 'User 1',
    email: 'user1@example.com',
    address: 'address_1',
    coordinates: [0, 0],
  },
  {
    id: '2',
    name: 'User 2',
    email: 'user2@example.com',
    address: 'address_2',
    coordinates: [0, 0],
  },
];

class DbGetAllUsersSpy implements GetAllUsersRepository {
  findAll(): Promise<User[] | null> {
    return Promise.resolve(mockResponse());
  }
}

type SutTypes = {
  sut: DbGetAllUsers;
  dbGetAllUsersSpy: DbGetAllUsersSpy;
};

const makeSut = (): SutTypes => {
  const dbGetAllUsersSpy = new DbGetAllUsersSpy();
  const sut = new DbGetAllUsers(dbGetAllUsersSpy);
  return {
    dbGetAllUsersSpy,
    sut,
  };
};

describe('DbGetAllUsers usecase', () => {
  it('return null if call UserRepository error', async () => {
    const { sut, dbGetAllUsersSpy } = makeSut();
    jest.spyOn(dbGetAllUsersSpy, 'findAll').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = await sut.get();
    expect(promise).toBeNull();
  });

  it('return all users', async () => {
    const { sut, dbGetAllUsersSpy } = makeSut();
    jest.spyOn(dbGetAllUsersSpy, 'findAll');
    const users = await sut.get();

    expect(users).toEqual(mockResponse());
  });
});
