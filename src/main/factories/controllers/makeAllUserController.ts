import { DbGetAllUsers } from '../../../data/usecases';
import { GetAllUsersRepositoryMongo } from '../../../infra/db/mongodb';
import { GetAllUserController } from '../../../presentation/controllers/get-all-user-controller';

export const makeAllUserController = (): GetAllUserController => {
  const getAllUsersRepository = new GetAllUsersRepositoryMongo();
  const getAllUsers = new DbGetAllUsers(getAllUsersRepository);
  return new GetAllUserController(getAllUsers);
};
