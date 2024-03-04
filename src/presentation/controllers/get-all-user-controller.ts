import { Controller, HttpResponse } from '../protocols';
import { forbidden, ok, serverError } from '../helpers/http-status-code';
import { GetAllUsers } from '../../domain/usecases/user/get-all-users';

export class GetAllUserController implements Controller {
  constructor(private readonly getAllUsers: GetAllUsers) {}

  async handle(): Promise<HttpResponse> {
    try {
      const users = await this.getAllUsers.get();

      if (!users) {
        return forbidden(new Error('there are no user'));
      }

      return ok(users);
    } catch (error) {
      return serverError(new Error());
    }
  }
}
