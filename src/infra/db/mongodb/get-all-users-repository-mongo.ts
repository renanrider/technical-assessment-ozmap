import { User } from '@/domain/models/user';
import UserModel from './models/UserModel';
import { GetAllUsersRepository } from '../../../data/protocols/db/user/get-all-user-repository';

export class GetAllUsersRepositoryMongo implements GetAllUsersRepository {
  async findAll(): Promise<User[] | null> {
    return await UserModel.find();
  }
}
