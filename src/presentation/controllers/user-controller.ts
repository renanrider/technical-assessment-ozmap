import { AddUser } from '@/domain/usecases/user/add-user';
import { badRequest, ok, serverError } from '../helpers/http-status-code';
import { Controller, HttpResponse } from '../protocols';
import { InvalidParamError } from '../errors/invalid-param-error';

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
    const requiredParams = ['name', 'email'];
    const { name } = request;
    for (const param of requiredParams) {
      if (!Object.keys(request).includes(param)) {
        return badRequest(new InvalidParamError(param));
      }
    }

    if (!name) return badRequest(new InvalidParamError('name'));

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
