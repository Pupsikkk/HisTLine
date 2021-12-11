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
}
