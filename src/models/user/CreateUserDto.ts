import { UserRole } from "../../enums/UserRoles";
import { UserStatus } from "../../enums/UserStatus";

export interface CreateUserDto {
  nickName: string;
  firstName: string;
  lastName: string;
  //   active: boolean;
  active: UserStatus;
  roleId: UserRole;
  // birthDay: Date;
  gender: string;
  email: string;
}
