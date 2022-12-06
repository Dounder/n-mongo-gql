import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './../users/entities/user.entity';
import { UsersService } from './../users/users.service';
import { USERS_TO_CREATE } from './data/users';

@Injectable()
export class SeedService {
  private isProd: boolean;

  constructor(
    //* Services
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
    //? Models
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {
    this.isProd = this.configService.get('state') === 'prod';
  }

  async execute(): Promise<string> {
    if (this.isProd)
      throw new UnauthorizedException('Cannot run SEED on production');

    await this.cleanDB(); //! Delete all data in db

    await this.loadUsers(); //* Create users

    return 'SEED executed';
  }

  async cleanDB() {
    await this.userModel.deleteMany({}); //! Delete all users
  }

  async loadUsers() {
    const users = USERS_TO_CREATE.map((user) => this.userService.create(user));
    await Promise.all(users);
  }
}
