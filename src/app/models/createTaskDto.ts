import {UserDto} from './user-dto';
import {GroupDto} from './group-dto';

export class CreateTaskDto{
  id: number;
  title: string;
  content: string;
  category: string;
  users: UserDto[];
  groups: GroupDto[];
}
