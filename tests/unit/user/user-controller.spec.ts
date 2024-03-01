import { faker } from '@faker-js/faker';
import {
  AddUser,
  AddUserParams,
  AddUserResult,
} from '@/domain/usecases/user/add-user';
import {
  UserController,
  UserRequest,
} from '@/presentation/controllers/user-controller';
import {
  badRequest,
  serverError,
} from '@/presentation/helpers/http-status-code';
import { InvalidParamError } from '@/presentation/errors/invalid-param-error';

const mockRequest = (): UserRequest => ({
  name: faker.person.firstName(),
  email: faker.internet.email(),
  address: faker.location.streetAddress(),
});

export class AddUserSpy implements AddUser {
  addUserParams: AddUserParams;

  constructor(addUserParams: AddUserParams) {
    this.addUserParams = addUserParams;
  }

  add(addUserParams: AddUserParams): Promise<AddUserResult | null> {
    this.addUserParams = addUserParams;

    return Promise.resolve(this.addUserParams);
  }
}

interface SutTypes {
  sut: UserController;
  addUserSpy: AddUserSpy;
}

const makeSut = (): SutTypes => {
  const addUserSpy = new AddUserSpy(mockRequest());
  const sut = new UserController(addUserSpy);
  return {
    sut,
    addUserSpy,
  };
};

describe('UserController', () => {
  test('Should return 500 if add user fails', async () => {
    const { sut, addUserSpy } = makeSut();
    jest.spyOn(addUserSpy, 'add').mockRejectedValueOnce(new Error());
    const request = mockRequest();
    const httpResponse = await sut.handle(request);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('Should return 400 if name is not provided', async () => {
    const { sut } = makeSut();
    const request = {
      name: '',
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
      coordinates: [faker.location.latitude(), faker.location.longitude()],
    };
    const httpResponse = await sut.handle(request);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('name')));
  });
});
