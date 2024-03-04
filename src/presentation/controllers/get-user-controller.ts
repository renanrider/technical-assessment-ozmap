import { GetUser } from '@/domain/usecases/user/get-user';
import { Controller, HttpResponse } from '../protocols';
import {
  badRequest,
  forbidden,
  ok,
  serverError,
} from '../helpers/http-status-code';
import { InvalidParamError } from '../errors/invalid-param-error';

export type GetUserRequest = {
  userId: string;
};

export class GetUserController implements Controller {
  constructor(private readonly getUser: GetUser) {}

  async handle(request: GetUserRequest): Promise<HttpResponse> {
    if (!request.userId) return badRequest(new InvalidParamError('userId'));

    try {
      const user = await this.getUser.get(request);

      if (!user) {
        return forbidden(new Error('user not found'));
      }

      return ok(user);
    } catch (error) {
      return serverError(new Error());
    }
  }
}
