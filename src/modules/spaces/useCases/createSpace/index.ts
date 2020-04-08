import { CreateSpaceController } from './CreateSpaceController';
import { CreateSpaceUseCase } from './CreateSpaceUseCase';
import { spaceRepo } from '../../repos';
import { userRepo } from '../../../users/repos';

const createSpaceUseCase = new CreateSpaceUseCase(spaceRepo, userRepo);
const createSpaceController = new CreateSpaceController(createSpaceUseCase);

export { createSpaceUseCase, createSpaceController };
