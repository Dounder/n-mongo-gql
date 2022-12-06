import { CreateUserInput } from './../../users/dto/inputs/create-user.input';
import { UserRoles } from './../../users/interfaces/user.interface';

export const USERS_TO_CREATE: CreateUserInput[] = [
  {
    username: 'admin',
    email: 'admin@admin.com',
    password: 'Aa1234!',
    roles: [UserRoles.admin, UserRoles.user],
  },
];
