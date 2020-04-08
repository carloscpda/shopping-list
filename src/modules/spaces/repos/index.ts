import { SpaceRepo } from './spaceRepo';
import models from '../../../infra/sequelize/models';

const spaceRepo = new SpaceRepo(models);

export { spaceRepo };
