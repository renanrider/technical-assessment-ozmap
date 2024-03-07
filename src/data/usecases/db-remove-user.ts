import {
  RemoveUser,
  RemoveUserParams,
  RemoveUserResult,
} from '@/domain/usecases/user/remove-user';
import { RemoveUserRepository } from '../protocols/db/user';

export class DbRemoveUser implements RemoveUser {
  constructor(private removeUserRepository: RemoveUserRepository) {}

  async remove(
    removeUserParams: RemoveUserParams,
  ): Promise<RemoveUserResult | null> {
    return await this.removeUserRepository.remove(removeUserParams);
  }
}
