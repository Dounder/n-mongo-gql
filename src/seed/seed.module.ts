import { Module } from '@nestjs/common';
import { UsersModule } from './../users/users.module';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [UsersModule],
})
export class SeedModule {}
