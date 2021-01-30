import {UserDto} from "./user-dto";
import {GroupDto} from "./group-dto";

export class TaskModelDto{
  id: number;
  title: string;
  content: string;
  category: string;
  users: UserDto[];
  groups: GroupDto[];
  status: string;
  claimedBy: UserDto;
  isClaimed: boolean;
}
