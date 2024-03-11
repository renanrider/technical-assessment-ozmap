import { User } from '@/domain/models/user';
import UserModel from './models/UserModel';
import {
  RemoveUserParams,
  RemoveUserRepository,
} from '@/data/protocols/db/user/remove-user-repository';

export class RemoveUserRepositoryMongo implements RemoveUserRepository {
  async remove(removeUserParams: RemoveUserParams): Promise<User | null> {
    return await UserModel.findByIdAndDelete({ _id: removeUserParams.userId });
  }
}
