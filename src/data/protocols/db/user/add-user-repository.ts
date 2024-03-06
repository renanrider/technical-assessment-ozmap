import { User } from '@/domain/models/user';

export type AddUserParams = {
  name: string;
  email: string;
  address?: string;
  coordinates?: number[];
};

export interface AddUserRepository {
  create(addUserParams: AddUserParams): Promise<User>;
}
