import express from 'express';
import { createUserController } from '../../../useCases/createUser';
import { authUserController } from '../../../useCases/authUser';

const userRouter = (passport) => {
  const router = express.Router();

  router.post('/', (req, res) => createUserController.execute(req, res));

  router.post('/login', (req, res, next) => authUserController.setPassport(passport).execute(req, res, next));

  return router;
};

export { userRouter };
