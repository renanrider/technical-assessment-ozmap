import { User } from '@/domain/models/user';
import { DbAddUser } from '@/data/usecases/db-add-user';
import { AddUserParams, AddUserRepository } from '@/data/protocols/db/user';

const mockRequest = (): User => ({
  name: 'any_name',
  email: 'any_email@email.com',
  address: 'any_address',
});

class DbAddUserSpy implements AddUserRepository {
  create(addUserParams: AddUserParams): Promise<User> {
    return Promise.resolve(addUserParams);
  }
}

type SutTypes = {
  sut: DbAddUser;
  dbAddUserSpy: DbAddUserSpy;
};

const makeSut = (): SutTypes => {
  const dbAddUserSpy = new DbAddUserSpy();
  const sut = new DbAddUser(dbAddUserSpy);
  return {
    dbAddUserSpy,
    sut,
  };
};

describe('DbAddUser usecase', () => {
  it('return null if call UserRepository error', async () => {
    const { sut, dbAddUserSpy } = makeSut();
    jest.spyOn(dbAddUserSpy, 'create').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = await sut.add(mockRequest());
    expect(promise).toBeNull();
  });
});
