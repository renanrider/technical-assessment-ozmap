import { User } from '@/domain/models/user';

export type GetAllUsersParams = {
  userId: string;
};

export interface GetAllUsersRepository {
  findAll(): Promise<User[] | null>;
}
