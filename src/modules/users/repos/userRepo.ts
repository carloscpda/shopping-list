import { User } from '../domain/user';
import { UserMap } from '../mappers/UserMap';
import { UserEmail } from '../domain/userEmail';

export interface IUserRepo {
  findUserById(id: string): Promise<User>;
  findUsersById(ids: string[]): Promise<User[]>;
  findUserByEmail(email: UserEmail): Promise<User>;
  exists(email: UserEmail): Promise<boolean>;
  save(user: User): Promise<void>;
}

export class UserRepo implements IUserRepo {
  private models: any;

  constructor(models: any) {
    this.models = models;
  }

  private createBaseQuery() {
    return {
      where: {},
      include: [],
    };
  }

  public async findUserById(userId: string): Promise<User> {
    const baseQuery = this.createBaseQuery();
    baseQuery.where['user_id'] = userId;
    const user = await this.models.User.findOne(baseQuery);
    if (!user) throw new Error('User not found');
    return UserMap.toDomain(user);
  }

  public async findUsersById(userIds: string[]): Promise<User[]> {
    const baseQuery = this.createBaseQuery();
    baseQuery.where['user_id'] = userIds;
    const users = await this.models.User.findAll(baseQuery);
    return users;
  }

  public async findUserByEmail(email: UserEmail): Promise<User> {
    const baseQuery = this.createBaseQuery();
    baseQuery.where['user_email'] = email.value.toString();
    const user = await this.models.User.findOne(baseQuery);
    if (!user) throw new Error('User not found');
    return UserMap.toDomain(user);
  }

  public async exists(email: UserEmail): Promise<boolean> {
    const baseQuery = this.createBaseQuery();
    baseQuery.where['user_email'] = email.value.toString();
    const user = await this.models.User.findOne(baseQuery);
    return !!user === true;
  }

  public async save(user: User): Promise<void> {
    const UserModel = this.models.User;
    const exists = await this.exists(user.email);
    const rawUser = await UserMap.toPersistence(user);

    try {
      if (!exists) {
        // Create new
        await UserModel.create(rawUser);
      } else {
        // Save old
        const sequelizeUserInstance = await UserModel.findOne({
          where: { user_email: user.email.value },
        });
        await sequelizeUserInstance.update(rawUser);
      }
    } catch (err) {
      console.log(err);
    }
  }
}
