import express from 'express';
import { userRouter } from '../../../modules/users/infra/http/routes';

const v1Router = express.Router();

// All routes go here
v1Router.use('/user', userRouter);

export { v1Router };
