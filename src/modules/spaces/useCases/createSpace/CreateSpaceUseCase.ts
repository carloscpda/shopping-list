import { UseCase } from '../../../../core/domain/UseCase';
import { CreateSpaceDTO } from './CreateSpaceDTO';
import { Either, Result, left, right } from '../../../../core/logic/Result';
import { CreateSpaceErrors } from './CreateSpaceErrors';
import { GenericAppError } from '../../../../core/logic/AppError';
import { ISpaceRepo } from '../../repos/spaceRepo';
import { IUserRepo } from '../../../users/repos/userRepo';
import { User } from '../../../users/domain/user';
import { includes } from 'lodash';
import { Space } from '../../domain/space';

type Response = Either<
  GenericAppError.UnexpectedError | CreateSpaceErrors.UserDoesntExistError | Result<any>,
  Result<void>
>;

export class CreateSpaceUseCase implements UseCase<CreateSpaceDTO, Promise<Response>> {
  private userRepo: IUserRepo;
  private spaceRepo: ISpaceRepo;

  constructor(spaceRepo: ISpaceRepo, userRepo: IUserRepo) {
    this.spaceRepo = spaceRepo;
    this.userRepo = userRepo;
  }

  async execute(req: CreateSpaceDTO): Promise<Response> {
    let owner: User;
    let members: User[] = [];

    const { name } = req;

    try {
      owner = await this.userRepo.findUserById(req.ownerId);
    } catch (err) {
      return left(new CreateSpaceErrors.UserDoesntExistError(req.ownerId));
    }

    members = await this.userRepo.findUsersById(req.memberIds);
    if (members.length < req.memberIds.length) {
      req.memberIds.forEach((memberId) => {
        if (!includes(members, memberId)) {
          return left(new CreateSpaceErrors.UserDoesntExistError(memberId));
        }
      });
    }

    const spaceOrError = Space.create({
      name,
      ownerId: owner.userId,
      members: members,
    });

    if (spaceOrError.isFailure) {
      return left(Result.fail<void>(spaceOrError.error)) as Response;
    }

    const space: Space = spaceOrError.getValue();

    try {
      await this.spaceRepo.save(space);
    } catch (err) {
      return left(new GenericAppError.UnexpectedError(err)) as Response;
    }

    return right(Result.ok<void>()) as Response;
  }
}
