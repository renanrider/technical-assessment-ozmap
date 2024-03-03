import {
  badRequest,
  forbidden,
  ok,
  serverError,
} from '@/presentation/helpers/http-status-code';
import {
  GetUser,
  GetUserParams,
  GetUserResult,
} from '@/domain/usecases/user/get-user';
import { GetUserController } from '@/presentation/controllers';
import { InvalidParamError } from '@/presentation/errors/invalid-param-error';

const mockRequest = (): GetUserParams => ({
  userId: '1',
});

const mockResponse = (): GetUserResult => ({
  id: '1',
  name: 'any_name',
  email: 'any_email@email.com',
  address: 'any_address',
  coordinates: [0, 0],
});

class GetUserSpy implements GetUser {
  getUserParams: GetUserParams;

  constructor(getUserParams: GetUserParams) {
    this.getUserParams = getUserParams;
  }

  get(getUserParams: GetUserParams): Promise<GetUserResult | null> {
    this.getUserParams = getUserParams;

    return Promise.resolve(mockResponse());
  }
}

interface SutTypes {
  sut: GetUserController;
  getUserSpy: GetUserSpy;
}

const makeSut = (): SutTypes => {
  const getUserSpy = new GetUserSpy(mockRequest());
  const sut = new GetUserController(getUserSpy);
  return {
    sut,
    getUserSpy,
  };
};

describe('GetUserController', () => {
  it('return 500 if get user throw server error', async () => {
    const { sut, getUserSpy } = makeSut();
    jest.spyOn(getUserSpy, 'get').mockRejectedValueOnce(new Error());
    const request = mockRequest();
    const httpResponse = await sut.handle(request);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  it('return 400 if userId is not provided', async () => {
    const { sut } = makeSut();
    const request = {
      userId: '',
    };
    const httpResponse = await sut.handle(request);
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('userId')));
  });

  it('return 404 if get user fails', async () => {
    const { sut, getUserSpy } = makeSut();
    const request = {
      userId: 'invalid_user_id',
    };
    jest.spyOn(getUserSpy, 'get').mockResolvedValueOnce(null);
    const httpResponse = await sut.handle(request);
    expect(httpResponse).toEqual(forbidden(new Error('user not found')));
  });

  it('return 200 with valid userId', async () => {
    const { sut } = makeSut();
    const request = mockRequest();
    const httpResponse = await sut.handle(request);
    expect(httpResponse).toEqual(ok(mockResponse()));
  });
});
