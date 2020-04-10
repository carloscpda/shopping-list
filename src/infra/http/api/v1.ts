import express from 'express';
import { userRouter } from '../../../modules/users/infra/http/routes';

const v1Router = (passport) => {
  const router = express.Router();

  // All routes go here
  router.use('/user', userRouter(passport));

  return router;
};

export { v1Router };
