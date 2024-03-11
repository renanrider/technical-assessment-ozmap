import { DbGetUser } from '../../../data/usecases';
import { GetUserRepositoryMongo } from '../../../infra/db/mongodb';
import { GetUserController } from '../../../presentation/controllers';

export const makeFindByIdUserController = (): GetUserController => {
  const getUserRepository = new GetUserRepositoryMongo();
  const getUser = new DbGetUser(getUserRepository);
  return new GetUserController(getUser);
};
