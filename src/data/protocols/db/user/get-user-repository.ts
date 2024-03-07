import { User } from '@/domain/models/user';

export type GetUserParams = {
  userId: string;
};

export interface GetUserRepository {
  findById(getUserParams: GetUserParams): Promise<User | null>;
}
