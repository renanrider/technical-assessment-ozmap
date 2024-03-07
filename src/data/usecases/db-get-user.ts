import {
  GetUser,
  GetUserParams,
  GetUserResult,
} from '@/domain/usecases/user/get-user';
import { GetUserRepository } from '@/data/protocols/db/user';

export class DbGetUser implements GetUser {
  constructor(private getUserRepository: GetUserRepository) {}

  async get(getUserParams: GetUserParams): Promise<GetUserResult | null> {
    try {
      const user = await this.getUserRepository.findById(getUserParams);
      return user;
    } catch (error) {
      return null;
    }
  }
}
