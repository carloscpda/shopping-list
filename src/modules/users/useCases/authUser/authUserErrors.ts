import { UseCaseError } from '../../../../core/logic/UseCaseError';
import { Result } from '../../../../core/logic/Result';

export namespace AuthUserErrors {
  export class InvalidEmailError extends Result<UseCaseError> {
    constructor(email: string) {
      super(false, {
        message: `The email ${email} is not valid`,
      } as UseCaseError);
    }
  }

  export class InvalidPasswordError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `The password provided is not valid`,
      } as UseCaseError);
    }
  }
}
