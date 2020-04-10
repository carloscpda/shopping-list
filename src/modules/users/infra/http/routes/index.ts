import express from 'express';
import { createUserController } from '../../../useCases/createUser';
import { authUserController } from '../../../useCases/authUser';

const userRouter = (passport) => {
  const router = express.Router();

  router.post('/', (req, res) => {
    return createUserController.execute(req, res);
  });

  router.post('/login', (req, res) => {
    return authUserController.setPassport(passport).execute(req, res);
  });

  return router;
};

export { userRouter };
