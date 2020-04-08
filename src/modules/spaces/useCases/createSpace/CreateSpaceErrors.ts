import { UseCaseError } from '../../../../core/logic/UseCaseError';
import { Result } from '../../../../core/logic/Result';

export namespace CreateSpaceErrors {
  export class UserDoesntExistError extends Result<UseCaseError> {
    constructor(userId: string) {
      super(false, {
        message: `The user with id '${userId}' doesnt exists`,
      } as UseCaseError);
    }
  }
}
