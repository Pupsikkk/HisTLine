import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Table,
  Model,
  BelongsToMany,
} from 'sequelize-typescript';
import { Instance } from 'src/instance/instance.model';
import { InstanceSubtype } from 'src/instance/instanceSubtype.model';
import { Type } from 'src/type/type.model';
import { User } from 'src/user/user.model';

class createSubtypeInterface {
  @ApiProperty({
    example: 'Інженер',
    description: 'Назва підтипу',
  })
  subtype_name: string;

  @ApiProperty({
    example: '#FF0000',
    description: 'Колір в 16ому представленні',
  })
  subtype_color: string;

  @ApiProperty({ example: 1, description: 'Ідентифікатор власника' })
  userId: number;

  @ApiProperty({
    example: 1,
    description: 'Ідентифікатор типу до якого відноситься',
  })
  typeId: number;
}

@Table({ tableName: 'subtypes' })
export class Subtype extends Model<Subtype, createSubtypeInterface> {
  @ApiProperty({ example: 1, description: 'Ідентифікатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Інженер',
    description: 'Назва підтипу',
  })
  @Column({
    type: DataType.STRING,
  })
  subtype_name: string;

  @ApiProperty({
    example: '#FF0000',
    description: 'Колір в 16ому представленні',
  })
  @Column({
    type: DataType.STRING,
  })
  subtype_color: string;

  @ApiProperty({ example: 1, description: 'Ідентифікатор власника' })
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ApiProperty({
    example: 1,
    description: 'Ідентифікатор типу до якого відноситься',
  })
  @ForeignKey(() => Type)
  @Column
  typeId: number;

  @BelongsToMany(() => Instance, () => InstanceSubtype)
  instances: Instance[];
}
