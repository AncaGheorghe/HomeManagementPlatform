import {UserDto} from './user-dto';

export class GroupDto {
  id: number;
  name: string;
  userDtoSet: UserDto[];


  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
