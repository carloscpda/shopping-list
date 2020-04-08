import { Space } from '../domain/space';
import { SpaceMap } from '../mappers/SpaceMap';
import { UserId } from '../../users/domain/userId';
import { SpaceId } from '../domain/spaceId';

export interface ISpaceRepo {
  findSpacesByUser(userId: UserId): Promise<Space[]>;
  save(space: Space): Promise<void>;
}

export class SpaceRepo implements ISpaceRepo {
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

  public async findSpacesByUser(userId: UserId): Promise<Space[]> {
    const baseQuery = this.createBaseQuery();
    baseQuery.where['user_id'] = userId.id.toString();
    const spaces = await this.models.UserSpace.find(baseQuery);
    return spaces;
  }

  public async exists(spaceId: SpaceId): Promise<boolean> {
    const baseQuery = this.createBaseQuery();
    baseQuery.where['id'] = spaceId.id.toString();
    const space = await this.models.Space.findOne(baseQuery);
    return !!space;
  }

  public async save(space: Space): Promise<void> {
    const SpaceModel = this.models.Space;
    const exists = await this.exists(space.spaceId);
    const rawSpace = SpaceMap.toPersistence(space);

    try {
      if (!exists) {
        // Create new
        await SpaceModel.create(rawSpace);
      } else {
        // Save old
        const sequelizeSpaceInstance = await SpaceModel.findOne({
          where: { id: space.spaceId.id },
        });
        await sequelizeSpaceInstance.update(rawSpace);
      }
    } catch (err) {
      console.log(err);
    }
  }
}
