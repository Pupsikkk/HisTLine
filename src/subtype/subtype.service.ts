import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createSubtypeDto } from './dto/create-subtype.dto';
import { Subtype } from './subtype.model';

@Injectable()
export class SubtypeService {
  constructor(
    @InjectModel(Subtype) private subtypeRepository: typeof Subtype,
  ) {}

  async createSubtype(subtype: createSubtypeDto, userId: number) {
    const isSubypeAlreadyInDB = await this.subtypeRepository.findOne({
      where: { subtype_name: subtype.subtype_name, userId: userId },
    });
    if (isSubypeAlreadyInDB)
      throw new HttpException('Такий тип вже існує', HttpStatus.BAD_REQUEST);
    const createdSubtype = await this.subtypeRepository.create({
      ...subtype,
      userId,
    });
    return createdSubtype;
  }

  async getSubtypeForUsers(
    subtype_name: string,
    typeId: number,
    userId: number,
  ) {
    const findedTypes = (await this.subtypeRepository.findAll({
      where: {
        subtype_name,
        userId,
        typeId,
      },
    })) as any;

    return findedTypes[0]?.dataValues;
  }

  async getSubtypesForUsers(subtypesArr: string[], possibleUserId: number[]) {
    let findedSubtypes = (await this.subtypeRepository.findAll({
      where: {
        subtype_name: subtypesArr,
        userId: possibleUserId,
      },
    })) as any;

    findedSubtypes = findedSubtypes.map((subtype) => subtype.dataValues);
    return findedSubtypes;
  }

  async getAllSubtypesForUsers(possibleUserId: number[]) {
    let findedSubtypes = (await this.subtypeRepository.findAll({
      where: {
        userId: possibleUserId,
      },
    })) as any;

    findedSubtypes = findedSubtypes.map((subtype) => subtype.dataValues);
    return findedSubtypes;
  }
}
