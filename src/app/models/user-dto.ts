export class UserDto {
  id: number;
  email: string;
  fullname: string;
  isManager: boolean;

  constructor(id: number, email: string) {
    this.id = id;
    this.email = email;
  }

}
