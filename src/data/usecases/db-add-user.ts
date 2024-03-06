import {
  AddUser,
  AddUserParams,
  AddUserResult,
} from '@/domain/usecases/user/add-user';
import { AddUserRepository } from '@/data/protocols/db/user';

export class DbAddUser implements AddUser {
  constructor(private addUserRepository: AddUserRepository) {}

  async add(userParams: AddUserParams): Promise<AddUserResult | null> {
    try {
      const user = await this.addUserRepository.create(userParams);
      return user;
    } catch (error) {
      return null;
    }
  }
}
