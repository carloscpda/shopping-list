import { UserId } from '../../../users/domain/userId';
import { UniqueEntityID } from '../../../../core/domain/UniqueEntityID';

export interface CreateSpaceDTO {
  id: number;
  name: string;
  ownerId: string;
  memberIds: string[];
}
