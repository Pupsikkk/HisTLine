import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Instance } from 'src/instance/instance.model';

interface createInstanceDescriptionInterface {
  description_text: string;
  link_raw: string;
  instanceId: number;
}

@Table({ tableName: 'instance-descriptions' })
export class InstanceDescription extends Model<
  InstanceDescription,
  createInstanceDescriptionInterface
> {
  @ApiProperty({ example: 1, description: 'Ідентифікатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Великий архітектор XVI стол...',
    description: 'Текст колонки',
  })
  @Column({
    type: DataType.STRING,
  })
  description_text: string;

  @ApiProperty({
    example:
      'https://ru.wikipedia.org/wiki/%D0%A2%D0%B5%D1%81%D0%BB%D0%B0,_%D0%9D%D0%B8%D0%BA%D0%BE%D0%BB%D0%B0',
    description: 'Посилання на зовнішній ресурс',
  })
  @Column({
    type: DataType.STRING,
  })
  link_raw: string;

  @ApiProperty({
    example: 1,
    description: 'Ідентифікатор колонки якій коментар належить',
  })
  @ForeignKey(() => Instance)
  @Column
  instanceId: number;

  @BelongsTo(() => Instance, 'instanceId')
  instance: Instance;
}
