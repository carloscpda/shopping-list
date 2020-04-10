import { Mapper } from '../../../core/infra/Mapper';
import { Space } from '../domain/space';
import { UniqueEntityID } from '../../../core/domain/UniqueEntityID';
import { UserMap } from '../../users/mappers/UserMap';

export class SpaceMap extends Mapper<Space> {
  public static toPersistence(space: Space): any {
    return {
      space_id: space.id.toString(),
      space_name: space.name,
      owner_id: space.ownerId.id.toValue().toString(),
    };
  }

  public static toDomain(raw: any): Space {
    const spaceOrError = Space.create(
      {
        name: raw.space_name,
        ownerId: raw.owner_id,
        members: raw.members.map((m) => UserMap.toDomain(m)),
      },
      new UniqueEntityID(raw.id),
    );

    spaceOrError.isFailure ? console.log(spaceOrError.error) : '';

    return spaceOrError.isSuccess ? spaceOrError.getValue() : null;
  }
}
