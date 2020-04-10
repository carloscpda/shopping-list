import { BaseController } from '../../../../core/infra/BaseController';
import { AuthService } from '../../services/auth/authService';
import { AuthUserErrors } from './authUserErrors';

export class AuthUserController extends BaseController {
  private passport: any;

  setPassport(passport: any): AuthUserController {
    this.passport = passport;
    return this;
  }

  async executeImpl(): Promise<any> {
    if (!this.passport) throw Error('No passport instance provided');
    this.passport.authenticate(AuthService.STRATEGY_NAME, (err, user, message) => {
      if (err) return this.fail(err);
      if (message?.message) return this.fail(message.message);

      if (!user) {
        switch (message.constructor) {
          case AuthUserErrors.InvalidEmailError:
            return this.unauthorized(message.errorValue().message);
          case AuthUserErrors.InvalidPasswordError:
            return this.unauthorized(message.errorValue().message);
          default:
            return this.fail(message.errorValue());
        }
      }

      this.req.logIn(user, (err) => {
        if (err) return this.fail(err);
        return this.ok(this.res);
      });
    })(this.req, this.res);
  }
}
