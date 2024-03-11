import { DbRemoveUser } from '../../../data/usecases';
import { RemoveUserRepositoryMongo } from '../../../infra/db/mongodb';
import { RemoveUserController } from '../../../presentation/controllers';

export const makeRemoveUserController = (): RemoveUserController => {
  const removeUserRepository = new RemoveUserRepositoryMongo();
  const removeUser = new DbRemoveUser(removeUserRepository);
  return new RemoveUserController(removeUser);
};
