import {
  GetAllUsers,
  GetAllUsersResult,
} from '@/domain/usecases/user/get-all-users';
import { GetAllUsersRepository } from '@/data/protocols/db/user';

export class DbGetAllUsers implements GetAllUsers {
  constructor(private getAllUsersRepository: GetAllUsersRepository) {}
  async get(): Promise<GetAllUsersResult> {
    try {
      const users = await this.getAllUsersRepository.findAll();
      return users;
    } catch (error) {
      return null;
    }
  }
}
