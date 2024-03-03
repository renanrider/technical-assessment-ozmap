import { GetUser } from '@/domain/usecases/user/get-user';
import { Controller, HttpResponse } from '../protocols';
import { ok, serverError } from '../helpers/http-status-code';

export type GetUserRequest = {
  userId: string;
};

export class GetUserController implements Controller {
  constructor(private readonly getUser: GetUser) {}

  async handle(request: GetUserRequest): Promise<HttpResponse> {
    try {
      const user = await this.getUser.get(request);

      return ok(user);
    } catch (error) {
      return serverError(new Error());
    }
  }
}
