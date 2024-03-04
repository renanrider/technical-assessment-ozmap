import { serverError } from '@/presentation/helpers/http-status-code';
import {
  GetAllUsers,
  GetAllUsersResult,
} from '@/domain/usecases/user/get-all-users';
import { GetAllUserController } from '@/presentation/controllers/get-all-user-controller';

const mockResponse = (): GetAllUsersResult => [
  {
    id: '1',
    name: 'any_name',
    email: 'any_email@email.com',
    address: 'any_address',
    coordinates: [0, 0],
  },
  {
    id: '2',
    name: 'another_name',
    email: 'another_email@email.com',
    address: 'another_address',
    coordinates: [1, 1],
  },
];

class GetAllUsersSpy implements GetAllUsers {
  constructor() {}

  async get(): Promise<GetAllUsersResult> {
    return mockResponse();
  }
}

interface SutTypes {
  sut: GetAllUserController;
  getAllUsersSpy: GetAllUsersSpy;
}

const makeSut = (): SutTypes => {
  const getAllUsersSpy = new GetAllUsersSpy();
  const sut = new GetAllUserController(getAllUsersSpy);
  return {
    sut,
    getAllUsersSpy,
  };
};

describe('GetAllUsersController', () => {
  it('return 500 if get users throw server error', async () => {
    const { sut, getAllUsersSpy } = makeSut();
    jest.spyOn(getAllUsersSpy, 'get').mockRejectedValueOnce(new Error());
    const httpResponse = await sut.handle();
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
