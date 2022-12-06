import { SetMetadata } from '@nestjs/common';
import { UserRoles } from './../../users/interfaces/user.interface';

export const ROLES_META = 'roles';

export const RoleProtected = (...args: UserRoles[]) =>
  SetMetadata(ROLES_META, args);
