import { AddUserRepository } from '@/data/protocols/db/user';
import { User } from '@/domain/models/user';
import UserModel from './models/UserModel';

export class AddUserRepositoryMongo implements AddUserRepository {
  async create(user: User): Promise<User> {
    return await UserModel.create(user);
  }
}
