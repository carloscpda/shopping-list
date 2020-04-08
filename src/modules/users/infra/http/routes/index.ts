import express from 'express';
import { createUserController } from '../../../useCases/createUser';

const userRouter = express.Router();

userRouter.post('/', (req, res) => {
  return createUserController.execute(req, res);
});

export { userRouter };
