import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import session from 'express-session';
import redis from 'redis';
import connectRedis from 'connect-redis';
import config from './config/config';
import { IUserRepo } from '../../repos/userRepo';
import { User } from '../../domain/user';
import { UserEmail } from '../../domain/userEmail';
import { AuthUserErrors } from '../../useCases/authUser/authUserErrors';

export interface IAuthService {
  init(app: any): void;
  ensureAuthenticated();
}

export class AuthService implements IAuthService {
  public static STRATEGY_NAME: string = 'shopphing-list-auth';

  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  private createSession() {
    const RedisStore = connectRedis(session);
    const redisClient = redis.createClient();

    return session({
      store: new RedisStore({ client: redisClient }),
      name: config.sessionCredentials.name,
      secret: config.sessionCredentials.password,
      resave: false,
      saveUninitialized: false,
    });
  }

  private createStrategy(): LocalStrategy {
    return new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      (email: string, password: string, done) => {
        const userEmailOrError = UserEmail.create(email);

        if (userEmailOrError.isFailure) {
          done(null, false, { message: userEmailOrError.error.toString() });
        }

        const userEmail = userEmailOrError.getValue();

        let user: User;
        (async () => {
          try {
            user = await this.userRepo.findUserByEmail(userEmail);
          } catch (err) {
            return done(null, false, new AuthUserErrors.InvalidEmailError(email));
          }

          const isValidPassword = await user.password.comparePassword(password);
          if (!isValidPassword) {
            return done(null, false, new AuthUserErrors.InvalidPasswordError());
          }
          return done(null, user);
        })();
      },
    );
  }

  private serializeUser(user: User, done) {
    return done(null, user.id.toValue());
  }

  private deserializeUser(userId, done) {
    return done(null, userId);
  }

  public init(app: any): void {
    app.use(this.createSession());
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(AuthService.STRATEGY_NAME, this.createStrategy());
    passport.serializeUser(this.serializeUser);
    passport.deserializeUser(this.deserializeUser);
  }

  public ensureAuthenticated() {
    return async (req, res, next) => {
      const isAuthenticated = req.isAuthenticated();
      if (!isAuthenticated) {
        return res.status(401).send({ message: 'Unauthorized' });
      }

      return next();
    };
  }
}
