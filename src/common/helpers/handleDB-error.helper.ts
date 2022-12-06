import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

const logger = new Logger('Exception');

export function HandleDbError(error: any) {
  let values = [];

  if (error.keyValue)
    values = Object.entries(error?.keyValue)?.map((e) => e.join('='));

  if (error.code === 11000) {
    throw new BadRequestException(`Register already exists in DB: ${values}`);
  }

  logger.log(error);
  throw new InternalServerErrorException('Unexpected error, check logs.');
}
