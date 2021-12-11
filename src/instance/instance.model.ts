import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
  Model,
  BelongsToMany,
  HasOne,
} from 'sequelize-typescript';
import { InstanceDescription } from 'src/instance-descriptions/instance-descriptions.model';
import { Subtype } from 'src/subtype/subtype.model';
import { Type } from 'src/type/type.model';
import { User } from 'src/user/user.model';
import { InstanceSubtype } from './instanceSubtype.model';

interface createInstanceInterface {
  name: string;
  fromYear: number;
  toYear: number;
  img: string;
  userId: number;
  typeId: number;
}

@Table({ tableName: 'instances' })
export class Instance extends Model<Instance, createInstanceInterface> {
  @ApiProperty({ example: 1, description: 'Ідентифікатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Нікола Тесла', description: 'Назва колонки' })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @ApiProperty({ example: 1856, description: 'З якого року' })
  @Column({
    type: DataType.INTEGER,
  })
  fromYear: number;

  @ApiProperty({ example: 1943, description: 'По такий рік' })
  @Column({
    type: DataType.INTEGER,
  })
  toYear: number;

  @ApiProperty({
    example:
      'https://lh3.googleusercontent.com/proxy/u_kU7ZJHxLSHxLP2GCB-QUD25ICBCDD7GjOdnkFj3FifCyVtIUC6ZjoLrQFm_paSvwAfG-H9U-VcCyF8x3SJQdR-bgrKutg',
    description: 'URL зображення',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  img: string;

  @ApiProperty({
    example: 1,
    description: 'Ідентифікатор батьківського користувача',
  })
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ApiProperty({
    example: 1,
    description: 'Ідентифікатор типу',
  })
  @ForeignKey(() => Type)
  @Column
  typeId: number;

  @HasOne(() => InstanceDescription, 'instanceId')
  instanceDescription: InstanceDescription;

  @BelongsToMany(() => Subtype, () => InstanceSubtype)
  subtypes: Subtype[];
}
