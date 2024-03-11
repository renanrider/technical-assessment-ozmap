import { DbAddUser } from '../../../data/usecases';
import { AddUserRepositoryMongo } from '../../../infra/db/mongodb';
import { AddUserController } from '../../../presentation/controllers';

export const makeAddUserController = (): AddUserController => {
  const addUserRepository = new AddUserRepositoryMongo();
  const addUser = new DbAddUser(addUserRepository);
  return new AddUserController(addUser);
};
