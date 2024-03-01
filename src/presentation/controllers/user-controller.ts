import { AddUser } from '@/domain/usecases/user/add-user';
import { ok, serverError } from '../helpers/http-status-code';
import { Controller, HttpResponse } from '../protocols';

export type UserRequest = {
  id?: string;
  name: string;
  email: string;
  address?: string;
  coordinates?: number[];
};

export class UserController implements Controller {
  constructor(private readonly addUser: AddUser) {}

  async handle(request: UserRequest): Promise<HttpResponse> {
    try {
      const user = await this.addUser.add(request);
      if (!user) {
        return serverError(new Error());
      }
      return ok(user);
    } catch (error) {
      return serverError(new Error());
    }
  }
}
