export class UserDto {
  id: number;
  email: string;
  fullname: string;
  isManager: boolean;

  constructor(id: number, fullname: string) {
    this.id = id;
    this.fullname = fullname;
  }
}
