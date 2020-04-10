import { Mapper } from '../../../core/infra/Mapper';
import { User } from '../domain/user';
import { UniqueEntityID } from '../../../core/domain/UniqueEntityID';
import { UserEmail } from '../domain/userEmail';
import { UserPassword } from '../domain/userPassword';

export class UserMap extends Mapper<User> {
  public static async toPersistence(user: User): Promise<any> {
    const password = user.password.isAlreadyHashed() ? user.password.value : await user.password.getHashedValue();
    return {
      user_id: user.id.toString(),
      user_email: user.email.value,
      user_password: password,
      user_first_name: user.firstName,
      user_last_name: user.lastName,
      is_email_verified: user.isEmailVerified,
    };
  }

  public static toDomain(raw: any): User {
    const userEmailOrError = UserEmail.create(raw.user_email);
    const userPasswordOrError = UserPassword.create({ value: raw.user_password, hashed: true });

    const userOrError = User.create(
      {
        email: userEmailOrError.getValue(),
        password: userPasswordOrError.getValue(),
        firstName: raw.user_first_name,
        lastName: raw.user_last_name,
        isEmailVerified: raw.is_email_verified,
      },
      new UniqueEntityID(raw.user_id),
    );

    userOrError.isFailure ? console.log(userOrError.error) : '';

    return userOrError.isSuccess ? userOrError.getValue() : null;
  }
}
