import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createSaveDto } from './dto/create-save.dto';
import { Save } from './save.model';

@Injectable()
export class SaveService {
  constructor(@InjectModel(Save) private saveRepository: typeof Save) {}

  async createSave(save: createSaveDto, userId: number) {
    const isTypeAlreadyInDB = await this.saveRepository.findOne({
      where: { userId: userId },
    });
    if (isTypeAlreadyInDB)
      throw new HttpException('Такий тип вже існує', HttpStatus.BAD_REQUEST);
    const createdType = await this.saveRepository.create({
      fromYear: save.fromYear,
      toYear: save.toYear,
      type_raw: save.types.join('$#$'),
      subtype_raw: save.subtypes.join('$#$'),
      userId,
    });
    return createdType;
  }
}
