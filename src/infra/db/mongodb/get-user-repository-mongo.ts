import { User } from '@/domain/models/user';
import UserModel from './models/UserModel';
import {
  GetUserParams,
  GetUserRepository,
} from '../../../data/protocols/db/user/get-user-repository';

export class GetUserRepositoryMongo implements GetUserRepository {
  async findById(getUserParams: GetUserParams): Promise<User | null> {
    return await UserModel.findById({ _id: getUserParams.userId });
  }
}
