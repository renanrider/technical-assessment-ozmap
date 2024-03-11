import { Router } from 'express';
import { adaptRoute } from '../adapters';
import {
  makeAddUserController,
  makeFindByIdUserController,
  makeAllUserController,
  makeRemoveUserController,
} from '../factories/controllers';

export default (router: Router): void => {
  //TODO: add geolocation service to resolve user geo location or street name, and pass as user param to controller
  router.post('/users', adaptRoute(makeAddUserController()));
  router.get('/users', adaptRoute(makeAllUserController()));
  router.get('/users/:userId', adaptRoute(makeFindByIdUserController()));
  router.delete('/users/:userId', adaptRoute(makeRemoveUserController()));
};
