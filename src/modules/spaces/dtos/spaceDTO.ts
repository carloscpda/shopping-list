import { UserDTO } from '../../users/dtos/userDTO';

export interface SpaceDTO {
  id: number;
  name: string;
  owner: UserDTO;
  members: UserDTO[];
}
