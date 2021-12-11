import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Instance } from 'src/instance/instance.model';
import { Subtype } from 'src/subtype/subtype.model';
import { User } from 'src/user/user.model';

export class createTypeInterface {
  @ApiProperty({ example: 'Історична особистість', description: 'Назва типу' })
  readonly type_name: string;

  @ApiProperty({
    example: '#FF0000',
    description: 'Колір в 16ому представленні',
  })
  readonly type_color: string;

  @ApiProperty({ example: 1, description: 'Ідентифікатор власника' })
  readonly userId: number;
}

@Table({ tableName: 'types' })
export class Type extends Model<Type, createTypeInterface> {
  @ApiProperty({ example: 1, description: 'Ідентифікатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Історична особистість', description: 'Назва типу' })
  @Column({
    type: DataType.STRING,
  })
  type_name: string;

  @ApiProperty({ example: '#FF0000', description: 'Колір типу' })
  @Column({
    type: DataType.STRING,
  })
  type_color: string;

  @ApiProperty({ example: 1, description: 'Ідентифікатор власника' })
  @ForeignKey(() => User)
  @Column
  userId: number;

  @HasMany(() => Instance)
  instance: Instance;

  @HasMany(() => Subtype)
  subtype: Subtype[];
}
