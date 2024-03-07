import { User } from '@/domain/models/user';
import { GetUserParams, GetUserRepository } from '@/data/protocols/db/user';
import { DbGetUser } from '@/data/usecases';

const mockRequest = (): GetUserParams => ({
  userId: '1',
});

const mockResponse = (): User => ({
  id: '1',
  name: 'any_name',
  email: 'any_email@email.com',
  address: 'any_address',
  coordinates: [0, 0],
});

class DbGetUserSpy implements GetUserRepository {
  findById(getUserParams: GetUserParams): Promise<User | null> {
    if (getUserParams.userId === '1') {
      return Promise.resolve(mockResponse());
    } else {
      return Promise.resolve(null);
    }
  }
}

type SutTypes = {
  sut: DbGetUser;
  dbGetUserSpy: DbGetUserSpy;
};

const makeSut = (): SutTypes => {
  const dbGetUserSpy = new DbGetUserSpy();
  const sut = new DbGetUser(dbGetUserSpy);
  return {
    dbGetUserSpy,
    sut,
  };
};

describe('DbGetUser usecase', () => {
  it('return null if call UserRepository error', async () => {
    const { sut, dbGetUserSpy } = makeSut();
    jest.spyOn(dbGetUserSpy, 'findById').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = await sut.get(mockRequest());
    expect(promise).toBeNull();
  });

  it('call UserRepository with correct params', async () => {
    const { sut, dbGetUserSpy } = makeSut();
    jest.spyOn(dbGetUserSpy, 'findById');

    await sut.get(mockRequest());
    expect(dbGetUserSpy.findById).toHaveBeenCalledWith(mockRequest());
  });
});
