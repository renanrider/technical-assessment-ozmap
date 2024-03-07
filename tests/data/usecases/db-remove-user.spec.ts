import { User } from '@/domain/models/user';
import {
  GetUserParams,
  RemoveUserParams,
  RemoveUserRepository,
} from '@/data/protocols/db/user';
import { DbRemoveUser } from '@/data/usecases';

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

class DbRemoveUserRepositorySpy implements RemoveUserRepository {
  remove(removeUserParams: RemoveUserParams): Promise<User | null> {
    if (removeUserParams.userId === '1') {
      return Promise.resolve(mockResponse());
    } else {
      return Promise.resolve(null);
    }
  }
}

type SutTypes = {
  dbRemoveUserRepositorySpy: DbRemoveUserRepositorySpy;
  sut: DbRemoveUser;
};

const makeSut = (): SutTypes => {
  const dbRemoveUserRepositorySpy = new DbRemoveUserRepositorySpy();
  const sut = new DbRemoveUser(dbRemoveUserRepositorySpy);
  return {
    sut,
    dbRemoveUserRepositorySpy,
  };
};

describe('DbRemoveUser usecase', () => {
  it('return null on remove error', async () => {
    const { sut, dbRemoveUserRepositorySpy } = makeSut();
    jest
      .spyOn(dbRemoveUserRepositorySpy, 'remove')
      .mockImplementationOnce(() => {
        return Promise.resolve(null);
      });

    const result = await sut.remove(mockRequest());
    expect(result).toBeNull();
  });
});
