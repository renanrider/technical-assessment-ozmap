import { serverError } from '@/presentation/helpers/http-status-code';
import {
  RemoveUser,
  RemoveUserParams,
  RemoveUserResult,
} from '@/domain/usecases/user/remove-user';
import { RemoveUserController } from '@/presentation/controllers';

const mockRequest = (): RemoveUserParams => ({
  userId: '1',
});

const mockResponse = (): RemoveUserResult => ({
  id: '1',
  name: 'any_name',
  email: 'any_email@email.com',
  address: 'any_address',
  coordinates: [0, 0],
});

export class RemoveUserSpy implements RemoveUser {
  removeUserParams: RemoveUserParams;

  constructor(removeUserParams: RemoveUserParams) {
    this.removeUserParams = removeUserParams;
  }

  remove(removeUserParams: RemoveUserParams): Promise<RemoveUserResult | null> {
    this.removeUserParams = removeUserParams;

    return Promise.resolve(mockResponse());
  }
}

interface SutTypes {
  sut: RemoveUserController;
  removeUserSpy: RemoveUserSpy;
}

const makeSut = (): SutTypes => {
  const removeUserSpy = new RemoveUserSpy(mockRequest());
  const sut = new RemoveUserController(removeUserSpy);
  return {
    sut,
    removeUserSpy,
  };
};

describe('RemoveUserController', () => {
  it('return 500 if remove user throw server error', async () => {
    const { sut, removeUserSpy } = makeSut();
    jest.spyOn(removeUserSpy, 'remove').mockRejectedValueOnce(new Error());
    const request = mockRequest();
    const httpResponse = await sut.handle(request);
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
