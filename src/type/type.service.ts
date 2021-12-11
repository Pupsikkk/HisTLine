import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createTypeDto } from './dto/create-type.dto';
import { Type } from './type.model';

@Injectable()
export class TypeService {
  constructor(@InjectModel(Type) private typeRepository: typeof Type) {}

  async createType(type: createTypeDto, userId: number) {
    const isTypeAlreadyInDB = await this.typeRepository.findOne({
      where: { type_name: type.type_name, userId: userId },
    });
    if (isTypeAlreadyInDB)
      throw new HttpException('Такий тип вже існує', HttpStatus.BAD_REQUEST);
    const createdType = await this.typeRepository.create({
      ...type,
      userId,
    });
    return createdType;
  }
}
