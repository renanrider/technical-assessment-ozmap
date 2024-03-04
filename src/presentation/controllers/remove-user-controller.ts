import { RemoveUser } from '@/domain/usecases/user/remove-user';
import { Controller, HttpResponse } from '../protocols';
import {
  badRequest,
  forbidden,
  ok,
  serverError,
} from '../helpers/http-status-code';
import { InvalidParamError } from '../errors/invalid-param-error';

export type RemoveUserRequest = {
  userId: string;
};

export class RemoveUserController implements Controller {
  constructor(private readonly removeUser: RemoveUser) {}

  async handle(request: RemoveUserRequest): Promise<HttpResponse> {
    if (!request.userId) return badRequest(new InvalidParamError('userId'));

    try {
      const user = await this.removeUser.remove(request);

      if (!user) {
        return forbidden(new Error('user not found'));
      }

      return ok(user);
    } catch (error) {
      return serverError(new Error());
    }
  }
}
