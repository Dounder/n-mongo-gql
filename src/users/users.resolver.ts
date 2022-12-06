import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Auth, GetUser } from './../auth/decorators';
import { PaginationArgs, SearchArgs } from './../common/dto';
import { ParseMongoIdPipe } from './../common/pipes/parse-mongo-id.pipe';
import { RoleArg } from './dto/args';
import { CreateUserInput, UpdateUserInput } from './dto/inputs';
import { User } from './entities/user.entity';
import { UserRoles } from './interfaces';
import { UsersService } from './users.service';

@Resolver(() => User)
@Auth()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  @Auth(UserRoles.admin)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return await this.usersService.create(createUserInput);
  }

  @Query(() => [User], {
    name: 'users',
    description: 'Get all users or filtered by username or roles',
  })
  @Auth(UserRoles.admin)
  async findAll(
    @Args() validRoles: RoleArg,
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<User[]> {
    return await this.usersService.findAll(
      validRoles.roles,
      paginationArgs,
      searchArgs,
    );
  }

  @Query(() => User, { name: 'user', description: 'Get user by id' })
  @Auth(UserRoles.admin)
  async findOne(
    @Args('id', { type: () => ID }, ParseMongoIdPipe) id: string,
  ): Promise<User> {
    return await this.usersService.findOne(id);
  }

  @Mutation(() => User)
  @Auth(UserRoles.admin)
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @GetUser() user: User,
  ): Promise<User> {
    return await this.usersService.update(
      updateUserInput.id,
      updateUserInput,
      user,
    );
  }

  @Mutation(() => User)
  @Auth(UserRoles.admin)
  async removeUser(
    @Args('id', { type: () => ID }, ParseMongoIdPipe) id: string,
    @GetUser() user: User,
  ): Promise<User> {
    return await this.usersService.remove(id, user);
  }
}
