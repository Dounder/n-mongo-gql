import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { isMongoId } from 'class-validator';
import { Model } from 'mongoose';

import { PaginationArgs, SearchArgs } from '../common/dto';
import { HandleDbError } from '../common/helpers';
import { CreateUserInput, UpdateUserInput } from './dto/inputs';
import { User } from './entities/user.entity';
import { UserRoles } from './interfaces';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  /**
   * Create a new user in db
   * @param createUserInput Input type for new User
   * @returns Promise who resolve a User
   */
  async create(createUserInput: CreateUserInput): Promise<User> {
    try {
      return await this.userModel.create({
        ...createUserInput,
        password: bcrypt.hashSync(createUserInput.password, 10),
        email: createUserInput.email.toLowerCase(),
      });
    } catch (error) {
      HandleDbError(error);
    }
  }

  /**
   * Get list of User paginated and filtered
   * @param roles Can be any roles valid in system, look at UserRoles enum
   * @param paginationArgs Argument to paginate results
   * @param searchArgs Search criteria, search is only for username or email
   * @returns Promise who resolve a list of User
   */
  async findAll(
    roles: UserRoles[],
    paginationArgs: PaginationArgs,
    searchArgs: SearchArgs,
  ): Promise<User[]> {
    try {
      const { limit, offset } = paginationArgs;
      const { search } = searchArgs;

      const users = this.userModel
        .find({})
        .limit(limit)
        .skip(offset)
        .populate('updatedBy', '-password');

      if (search)
        users.find({ $or: [{ username: { $regex: search, $options: 'i' } }] });

      if (roles.length === 0) return await users.exec();

      return await users.find({ roles: { $in: roles } }).exec();
    } catch (error) {
      HandleDbError(error);
    }
  }

  /**
   * Get one user by id or username
   * @param term Can be a mongo id or username
   * @returns Promise who resove a User
   */
  async findOne(term: string): Promise<User> {
    try {
      const user = isMongoId(term)
        ? await this.userModel.findById(term).populate('updatedBy', '-password')
        : await this.userModel
            .findOne({ $or: [{ username: { $regex: term, $options: 'i' } }] })
            .populate('updatedBy', '-password');

      if (!user) throw new NotFoundException(`User with id ${term} not found`);

      if (user.deletedAt)
        throw new ForbiddenException(`User is inactive talk with admin`);

      return user;
    } catch (error) {
      HandleDbError(error);
    }
  }

  /**
   * Update any user by Id
   * @param id Id of User to update
   * @param updateUserInput Input type for update User
   * @returns Promise who resolve a User
   */
  async update(
    id: string,
    updateUserInput: UpdateUserInput,
    user: User,
  ): Promise<User> {
    try {
      return await this.userModel.findByIdAndUpdate(
        id,
        { ...updateUserInput, updatedBy: user.id },
        { new: true },
      );
    } catch (error) {
      HandleDbError(error);
    }
  }

  /**
   * Soft delete a User in Db, can be reactivated by updating
   * @param id Id of User to delete
   * @returns Promise who resolve a User
   */
  async remove(id: string, user: User): Promise<User> {
    try {
      return await this.userModel.findByIdAndUpdate(
        id,
        { deletedAt: Date.now(), updatedBy: user },
        { new: true },
      );
    } catch (error) {
      HandleDbError(error);
    }
  }
}
