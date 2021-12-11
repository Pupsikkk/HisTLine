import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createDescriptionDto } from './dto/create-description.dto';
import { InstanceDescription } from './instance-descriptions.model';

@Injectable()
export class InstanceDescService {
  constructor(
    @InjectModel(InstanceDescription)
    private instanceDescRepository: typeof InstanceDescription,
  ) {}

  async createDescription(description: createDescriptionDto) {
    const isDescAlreadyInDB = await this.instanceDescRepository.findOne({
      where: { instanceId: description.instanceId },
    });
    if (isDescAlreadyInDB)
      throw new HttpException('Такий тип вже існує', HttpStatus.BAD_REQUEST);
    const link_raw = description.links.join('$#$');
    const createdDesc = await this.instanceDescRepository.create({
      description_text: description.description_text,
      instanceId: description.instanceId,
      link_raw: link_raw,
    });
    return createdDesc;
  }
}
