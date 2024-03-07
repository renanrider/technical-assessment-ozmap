import { User } from '@/domain/models/user';

export type RemoveUserParams = {
  userId: string;
};

export interface RemoveUserRepository {
  remove(removeUserParams: RemoveUserParams): Promise<User | null>;
}
