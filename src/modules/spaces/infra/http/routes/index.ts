import express from 'express';
import { createSpaceController } from '../../../useCases/createSpace';
import { ensureAuthController } from '../../../../users/useCases/ensureAuthUser';

const spaceRouter = () => {
  const router = express.Router();

  router.post(
    '/',
    (req, res, next) => ensureAuthController.execute(req, res, next),
    (req, res) => createSpaceController.execute(req, res),
  );

  return router;
};

export { spaceRouter };
