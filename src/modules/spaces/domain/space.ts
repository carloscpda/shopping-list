import { AggregateRoot } from '../../../core/domain/AggregateRoot';
import { UserId } from '../../users/domain/userId';
import { User } from '../../users/domain/user';
import { UniqueEntityID } from '../../../core/domain/UniqueEntityID';
import { Result } from '../../../core/logic/Result';
import { Guard } from '../../../core/logic/Guard';
import { SpaceId } from './spaceId';

interface SpaceProps {
  name: string;
  ownerId: UserId;
  members: User[];
}

export class Space extends AggregateRoot<SpaceProps> {
  get spaceId(): SpaceId {
    return SpaceId.create(this._id).getValue();
  }

  get name(): string {
    return this.props.name;
  }

  get ownerId(): UserId {
    return this.props.ownerId;
  }

  get members(): UserId[] {
    return this.props.members;
  }

  private constructor(props: SpaceProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: SpaceProps, id?: UniqueEntityID): Result<Space> {
    const guardedProps = [
      { argument: props.name, argumentName: 'name' },
      { argument: props.ownerId, argumentName: 'ownerId' },
      { argument: props.members, argumentName: 'members' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Space>(guardResult.message);
    } else {
      const space = new Space(props, id);

      return Result.ok<Space>(space);
    }
  }
}
