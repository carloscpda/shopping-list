import { Mapper } from '../../../core/infra/Mapper';
import { Space } from '../domain/space';
import { UniqueEntityID } from '../../../core/domain/UniqueEntityID';
import { UserMap } from '../../users/mappers/UserMap';

export class SpaceMap extends Mapper<Space> {
  public static toPersistence(space: Space): any {
    return {
      id: space.spaceId.toString(),
      name: space.name,
      owner_id: space.ownerId,
    };
  }

  public static toDomain(raw: any): Space {
    const spaceOrError = Space.create(
      {
        name: raw.name,
        ownerId: raw.owner_id,
        members: raw.members.map((m) => UserMap.toDomain(m)),
      },
      new UniqueEntityID(raw.id),
    );

    spaceOrError.isFailure ? console.log(spaceOrError.error) : '';

    return spaceOrError.isSuccess ? spaceOrError.getValue() : null;
  }
}
