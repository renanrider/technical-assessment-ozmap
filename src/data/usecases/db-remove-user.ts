import {
  RemoveUser,
  RemoveUserParams,
  RemoveUserResult,
} from '@/domain/usecases/user/remove-user';
import { GetUserRepository } from '@/data/protocols/db/user';
import { RemoveUserRepository } from '../protocols/db/user';

export class DbRemoveUser implements RemoveUser {
  constructor(
    private getUserRepository: GetUserRepository,
    private removeUserRepository: RemoveUserRepository,
  ) {}

  async remove(
    getUserParams: RemoveUserParams,
  ): Promise<RemoveUserResult | null> {
    try {
      const user = await this.getUserRepository.findById(getUserParams);

      if (!user) throw new Error('user not found');

      try {
        await this.removeUserRepository.remove(getUserParams);
        return user;
      } catch (error) {
        return null;
      }
    } catch (error) {
      return null;
    }
  }
}
